import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Color";
import { useRouter } from "expo-router";

export default function StartMyTrip() {
  const route = useRouter();
  return (
    <View style={styles.container}>
      <Ionicons name="location-sharp" size={60} color={Colors.Primary} />
      <Text style={styles.title}>No Trip Planned Yet</Text>
      <Text style={styles.subtitle}>
        Looks like you haven't planned any trips yet.{"\n"}Start planning your
        next adventure!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => route.push("/create-trip/search-place")}
      >
        <Text style={styles.buttonText}>Start a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 20,
    color: Colors.BLACK,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
    textAlign: "center",
    color: Colors.GRAY,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.Primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 30,
    elevation: 3,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});
