import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Colors } from "../../constants/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";
import { useRouter } from "expo-router";

export default function ReviewTrip() {
  const { trip, setTripData } = useContext(CreateTripContext); // Access the trip state from context
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 25,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/* Header Section */}
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Review Your Trip
      </Text>

      {/* Intro Section */}
      <Text
        style={{
          fontSize: 18,
          color: "#666",
          marginBottom: 40,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        Please review your trip details before proceeding with your booking.
      </Text>

      {/* Destination Section */}
      <View
        style={{
          backgroundColor: "#F0F4FF",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location-sharp" size={30} color="#6366F1" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
              marginLeft: 15,
            }}
          >
            Destination
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginTop: 10,
            marginLeft: 45,
          }}
        >
          {trip?.location || "Not selected yet"}
        </Text>
      </View>

      {/* Date Section */}
      <View
        style={{
          backgroundColor: "#FFFAF0",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="calendar-sharp" size={30} color="#6366F1" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
              marginLeft: 15,
            }}
          >
            Date Selected
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginTop: 10,
            marginLeft: 45,
          }}
        >
          {trip?.startDate &&
            `${moment(trip?.startDate).format("DD MMM")} To ${moment(
              trip?.endDate
            ).format("DD MMM")} (${trip?.totalNoOfDays} Days)`}
        </Text>
      </View>

      {/* Traveller Section */}
      <View
        style={{
          backgroundColor: "#E8F7FF",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="people-sharp" size={30} color="#6366F1" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
              marginLeft: 15,
            }}
          >
            Who is Traveling
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginTop: 10,
            marginLeft: 45,
          }}
        >
          {trip?.travellerCount || "Not specified yet"}
        </Text>
      </View>

      {/* Budget Section */}
      <View
        style={{
          backgroundColor: "#FFF4E1",
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="wallet-sharp" size={30} color="#6366F1" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
              marginLeft: 15,
            }}
          >
            Budget
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginTop: 10,
            marginLeft: 45,
          }}
        >
          {trip?.budget || "Not selected yet"}
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#6366F1",
          paddingVertical: 15,
          borderRadius: 25,
          alignItems: "center",
          marginTop: 40,
        }}
        onPress={() => router.push("/create-trip/generate-trip")}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#FFF",
            fontWeight: "bold",
          }}
        >
          Proceed to Booking
        </Text>
      </TouchableOpacity>
    </View>
  );
}
