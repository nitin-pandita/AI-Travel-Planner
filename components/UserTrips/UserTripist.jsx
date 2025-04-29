import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import moment from "moment";
import UserTripCard from "../MyTrip/UserTripCard";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrip }) {
  console.log("Value of User Trip in userTripList", userTrip);
  const router = useRouter();

  // Find the first trip that has tripPlan and places
  const tripWithPlan = userTrip?.find(
    (trip) => trip?.tripPlan && trip?.tripPlan?.places?.length > 0
  );

  // Assuming the first trip's tripData should be parsed
  let LatestTrip = userTrip[0]?.tripData;

  if (typeof LatestTrip === "string") {
    // If tripData is a string, parse it
    try {
      LatestTrip = JSON.parse(LatestTrip);
    } catch (error) {
      console.error("Error parsing tripData:", error);
      LatestTrip = {}; // fallback to empty object in case of error
    }
  }

  // Now handle tripData separately
  let locationName = "No Location";
  let travellerCount = "Unknown";
  let totalNoOfDays = "Unknown";
  let budget = "Unknown";

  if (tripWithPlan?.tripData) {
    try {
      const parsedTripData = JSON.parse(tripWithPlan.tripData); // parse the JSON string
      locationName = parsedTripData.location || "No Location"; // get location
      travellerCount = parsedTripData.travellerCount || "Unknown"; // get travellerCount
      totalNoOfDays = parsedTripData.totalNoOfDays || "Unknown"; // get totalNoOfDays
      budget = parsedTripData.budget || "Unknown"; // get budget
    } catch (error) {
      console.error("Error parsing tripData:", error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Featured Trip Card */}
      <View style={styles.featuredCard}>
        {/* Image with Gradient Overlay */}
        <View style={styles.imageContainer}>
          {/* Using dynamic locationImage from userTrip */}
          <Image
            source={{ uri: userTrip[0]?.locationImage }}
            style={{ width: "100%", height: 250 }}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
            style={styles.gradientOverlay}
          />
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Location */}
          <Text style={styles.locationText}>{locationName}</Text>

          {/* Details Container */}
          <View style={styles.detailsContainer}>
            {/* Traveller Count */}
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>👥</Text>
              <Text style={styles.detailText}>{travellerCount} travelers</Text>
            </View>

            {/* Total Days */}
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📅</Text>
              <Text style={styles.detailText}>{totalNoOfDays} days</Text>
            </View>

            {/* Budget */}
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💰</Text>
              <Text style={styles.detailText}>${budget}</Text>
            </View>
          </View>

          {/* Start Date */}
          <Text style={styles.dateText}>
            {moment(LatestTrip.startDate).format("MMMM DD, YYYY")}
          </Text>

          {/* View More Button */}
          <TouchableOpacity
            onPressIn={() =>
              JSON.stringify(
                router.push({
                  pathname: "/trip-details",
                  params: {
                    trip: JSON.stringify(userTrip),
                  },
                })
              )
            }
            style={styles.viewMoreButton}
          >
            <Text style={styles.viewMoreText}>See Your Plan →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section Title for Other Trips */}
      <Text style={styles.sectionTitle}>Your Other Trips</Text>

      {/* Other Trips */}
      {userTrip.slice(1).map((trip, index) => {
        return (
          <View key={index} style={styles.tripCardContainer}>
            <UserTripCard trip={trip} />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
  },
  featuredCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  contentContainer: {
    padding: 20,
  },
  locationText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2d3436",
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#636e72",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    color: "#0984e3",
    fontWeight: "600",
    marginBottom: 20,
  },
  viewMoreButton: {
    backgroundColor: "#0984e3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  viewMoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  tripCardContainer: {
    marginBottom: 16,
  },
});
