import { GoogleGenAI } from "@google/genai";
import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Color";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_Prompt } from "../../components/OptionList";
import { useRouter } from "expo-router";
import { auth, db } from "../../configs/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_API_ACCESS_KEY;

export default function GenerateTrip() {
  const user = auth.currentUser;
  const { trip } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    generateTripPlan();
  }, []);

  const fetchLocationImage = async (location) => {
    try {
      const { data } = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: location,
            per_page: 1,
            orientation: "landscape",
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      return data.results.length > 0 ? data.results[0].urls.regular : null;
    } catch (error) {
      console.error("Unsplash API Error:", error);
      return null;
    }
  };

  const generateTripPlan = async () => {
    setLoading(true);

    const startDate = new Date().toISOString().split("T")[0];

    const finalPrompt = AI_Prompt.replace(
      "{location}",
      trip?.location || "default location"
    )
      .replace("{totalDay}", trip?.totalNoOfDays || 1)
      .replace("{totalNight}", (trip?.totalNoOfDays || 1) - 1)
      .replace("{traveller}", trip?.travellerCount || 1)
      .replace("{budget}", trip?.budget || "normal")
      .replace("{startDate}", startDate);

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: [{ text: finalPrompt }],
      });

      let result = response.text.trim();

      if (result.startsWith("```json")) {
        result = result
          .replace(/^```json\s*/, "")
          .replace(/```$/, "")
          .trim();
      }

      let tripPlan;
      try {
        tripPlan = JSON.parse(result);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        setLoading(false);
        return;
      }

      const locationImage = await fetchLocationImage(
        trip?.location || "travel"
      );

      const docId = Date.now().toString();
      await setDoc(doc(db, "UserTrip", docId), {
        userEmail: user.email,
        tripPlan,
        tripData: JSON.stringify(trip),
        locationImage, // 🖼️ Saving location image URL also
        docId,
      });

      router.push("(tabs)/my-trips");
    } catch (error) {
      console.error("Error during Trip Generation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generating Your Perfect Trip...</Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.Primary}
          style={{ marginVertical: 30 }}
        />
      )}

      <Image
        source={require("../../assets/images/Car.gif")}
        style={styles.image}
      />

      <Text style={styles.subText}>Please don’t go back or close the app.</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 75,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    color: Colors.DARK,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  subText: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 30,
  },
};
