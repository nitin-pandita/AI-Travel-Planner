import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Color";
import moment from "moment";
import FlightDetails from "../../components/UserTrips/FlightDetails";
import { FontAwesome } from "@expo/vector-icons"; // Using FontAwesome for icons
import HotelDetails from "../../components/UserTrips/HotelDetails";
import TripPlan from "../../components/UserTrips/TripPlan";

export default function TripDetails() {
  const { trip } = useLocalSearchParams();
  const navigation = useNavigation();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerTransparent: true,
    });

    if (trip) {
      // Parse the trip data if it's a string and set the details
      const parsedTrip = typeof trip === "string" ? JSON.parse(trip) : trip;
      const tripData = parsedTrip[0]; // Assuming you're working with the first item in the array

      // Parse tripData which is a stringified JSON
      const parsedTripData = tripData?.tripData
        ? JSON.parse(tripData.tripData)
        : {};

      setTripDetails({
        locationImage: tripData.locationImage,
        location: parsedTripData.location, // Parsing the location field
        tripData: parsedTripData, // Storing the trip data here as well
        tripPlan: tripData.tripPlan, // Store the tripPlan here too
      });
    }
  }, []);

  if (!tripDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display image */}
      {tripDetails.locationImage ? (
        <Image
          source={{ uri: tripDetails.locationImage }}
          style={styles.locationImage}
        />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}

      {/* Trip Information */}
      <View style={styles.detailsContainer}>
        <Text style={styles.locationText}>
          {tripDetails.location || "Location not available"}
        </Text>

        {/* Dates Section with Icons */}
        <View style={styles.dateContainer}>
          <View style={styles.dateBlock}>
            <FontAwesome name="calendar" size={20} color={Colors.PRIMARY} />
            <Text style={styles.dateText}>
              {tripDetails.tripData?.startDate
                ? moment(tripDetails.tripData.startDate).format("MMM D, YYYY")
                : "Start date not available"}
            </Text>
          </View>
          <Text style={styles.toText}>to</Text>
          <View style={styles.dateBlock}>
            <FontAwesome name="calendar" size={20} color={Colors.PRIMARY} />
            <Text style={styles.dateText}>
              {tripDetails.tripData?.endDate
                ? moment(tripDetails.tripData.endDate).format("MMM D, YYYY")
                : "End date not available"}
            </Text>
          </View>
        </View>

        {/* Traveller Section with Icon */}
        <View style={styles.travellerBlock}>
          <FontAwesome name="users" size={20} color={Colors.PRIMARY} />
          <Text style={styles.travellerText}>
            {tripDetails.tripData?.travellerCount
              ? `Travellers: ${tripDetails.tripData.travellerCount}`
              : "Traveller count not available"}
          </Text>
        </View>
      </View>

      {/* Flight info */}
      {tripDetails.tripPlan?.flight ? (
        <FlightDetails flightDetails={tripDetails.tripPlan.flight} />
      ) : (
        <Text style={styles.noFlightText}>No flight details available</Text>
      )}
      {/* Hotel Details */}
      {tripDetails.tripPlan?.hotels ? (
        <HotelDetails hotelDetails={tripDetails.tripPlan.hotels} />
      ) : (
        <Text style={styles.noFlightText}>No flight details available</Text>
      )}
      {/* Trip Plan */}
      <TripPlan tripPlan={tripDetails.tripPlan.itinerary} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  noImageText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
  detailsContainer: {
    paddingVertical: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 15,
    marginTop: -30,
  },
  locationText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },

  // Date Section Styles
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  dateBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
  },
  toText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  // Traveller Section Styles
  travellerBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  travellerText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
  },

  noFlightText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 15,
  },
});
