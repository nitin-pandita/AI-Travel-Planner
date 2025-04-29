import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Color";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("/Users/nitinpandita/Coding/Projects/React Native/ai-travel-planner/assets/Traveler.jpeg")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.heading}>AI Travel Planner</Text>
        <Text style={styles.subheading}>
          Plan smarter, travel better. Your personalized travel assistant,
          powered by AI.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/signin")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  image: {
    width: width,
    height: 460,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
    lineHeight: 24,
  },
  button: {
    marginTop: 50,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
