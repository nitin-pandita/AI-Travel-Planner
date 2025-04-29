import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // For better icons

export default function UserTripCard({ trip }) {
  const tripData =
    typeof trip?.tripData === "string"
      ? JSON.parse(trip.tripData)
      : trip?.tripData || {};
  const places = trip?.tripPlan?.places || [];

  // Extracting trip information with fallback
  const location = tripData?.location || "No Location";
  const startDate = tripData?.startDate
    ? moment(tripData.startDate).format("MMM D, YYYY")
    : "No Date";
  const travellerCount = tripData?.travellerCount || "N/A";
  const budget = tripData?.budget ? `$${tripData.budget}` : "N/A";

  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
      <View style={styles.card}>
        {/* Image and Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: trip?.locationImage }} style={styles.image} />
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
            style={styles.gradientOverlay}
          />
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>{places.length} Places</Text>
          </View>
        </View>

        {/* Trip Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.locationText} numberOfLines={1}>
            {location}
          </Text>
          <Text style={styles.dateText}>{startDate}</Text>

          {/* Trip Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons
                name="people"
                size={20}
                color="#0984e3"
                style={styles.statIcon}
              />
              <Text style={styles.statText}>{travellerCount}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name="cash"
                size={20}
                color="#0984e3"
                style={styles.statIcon}
              />
              <Text style={styles.statText}>{budget}</Text>
            </View>
          </View>
        </View>

        {/* Places Preview */}
        {places.length > 0 && (
          <View style={styles.placesContainer}>
            {places.slice(0, 2).map((place, index) => (
              <View key={index} style={styles.placeItem}>
                <View style={styles.placeBullet} />
                <Text style={styles.placeName} numberOfLines={1}>
                  {place?.placeName || "Unnamed Place"}
                </Text>
              </View>
            ))}
            {places.length > 2 && (
              <Text style={styles.morePlacesText}>
                +{places.length - 2} more
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  imageBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imageBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  infoContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  locationText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 4,
    lineHeight: 28,
  },
  dateText: {
    fontSize: 16,
    color: "#636e72",
    marginBottom: 12,
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    marginRight: 6,
  },
  statText: {
    fontSize: 16,
    color: "#636e72",
    fontWeight: "600",
  },
  placesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // Reduced height
    height: 30, // Shortened the height
  },
  placeBullet: {
    width: 6, // Smaller bullet size
    height: 6, // Smaller bullet size
    borderRadius: 3,
    backgroundColor: "#0984e3",
    marginRight: 8,
  },
  placeName: {
    fontSize: 14, // Smaller text size
    color: "#2d3436",
    flex: 1,
  },
  morePlacesText: {
    fontSize: 12,
    color: "#636e72",
    marginTop: 4,
    fontStyle: "italic",
  },
});
