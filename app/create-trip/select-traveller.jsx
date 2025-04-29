import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { OptionList } from "../../components/OptionList";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { Colors } from "../../constants/Color";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectTraveller() {
  const router = useRouter();
  const navigation = useNavigation();
  const [traveller, setTraveller] = useState("");

  const { trip, setTrip } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTrip((prev) => ({
      ...prev,
      travellerCount: traveller,
    }));
  }, [traveller]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.DARK_BG, padding: 25 }}>
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Who’s traveling?
      </Text>
      <Text style={{ color: Colors.GRAY, fontSize: 16, marginBottom: 20 }}>
        Select your travel group
      </Text>

      <FlatList
        data={OptionList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setTraveller(item.title)}
          >
            <OptionCard option={item} SelectTraveller={traveller} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={traveller === ""}
        onPress={() => {
          // ✅ Add your navigation logic or next step here
        }}
        style={{
          backgroundColor: traveller === "" ? "#2C2C2C" : "#4F46E5",
          paddingVertical: 16,
          borderRadius: 12,
          marginTop: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 6,
          opacity: traveller === "" ? 0.5 : 1,
        }}
      >
        <Text
          onPress={() => router.push("/create-trip/select-dates")}
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
