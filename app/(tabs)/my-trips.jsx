import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartMyTrip from "../../components/MyTrip/StartMyTrip";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import UserTripList from "../../components/UserTrips/UserTripist";
import { useNavigation, useRouter } from "expo-router";

export default function MyTrip() {
  const [tripData, setTripData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    if (user) {
      GetMyTrips(); // Ensure the function is called here
    }
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setTripData([]);
    const q = query(
      collection(db, "UserTrip"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      trips.push(doc.data());
    });

    setTripData(trips); // Update state with the retrieved trip data
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity onPress={() => router.push("/StartMyTrip")}>
          <Ionicons name="add-circle" size={40} color={Colors.Primary} />
        </TouchableOpacity>
      </View>

      {Loading ? (
        <Text>Loading...</Text> // Show a loading text if data is being fetched
      ) : tripData.length === 0 ? (
        <StartMyTrip />
      ) : (
        <UserTripList userTrip={tripData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.BLACK,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 20,
    textAlign: "center",
  },
});
