import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // For icons

export default function FlightDetails({ flightDetails }) {
  return (
    <View style={styles.container}>
      {/* Header with Icon */}
      <View style={styles.header}>
        <Icon
          name="plane"
          size={28}
          color="#64B5F6"
          style={styles.headerIcon}
        />
        <Text style={styles.title}>Flight Details</Text>
      </View>

      {/* Airline */}
      <View style={styles.infoRow}>
        <Icon name="plane" size={18} color="#777" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Airline:{" "}
          <Text style={styles.infoValue}>
            {flightDetails?.airline || "Not available"}
          </Text>
        </Text>
      </View>

      {/* Price */}
      <View style={styles.infoRow}>
        <Icon name="usd" size={18} color="#777" style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Price:{" "}
          <Text style={styles.infoValue}>
            {flightDetails?.price || "Not available"}
          </Text>
        </Text>
      </View>

      {/* Booking Button */}
      {flightDetails?.bookingUrl ? (
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() => Linking.openURL(flightDetails.bookingUrl)}
        >
          <Text style={styles.bookingButtonText}>Book Now</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.infoText}>Booking URL: Not available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 10,
    shadowOpacity: 0.08,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 10,
    color: "#777", // Slightly darker gray icon
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  infoValue: {
    fontWeight: "bold",
    color: "#333",
  },
  bookingButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#2C6BED", // Primary blue
    borderRadius: 8,
    alignItems: "center",
  },
  bookingButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
