import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Color";
import { CreateTripContext } from "../../context/CreateTripContext";

// API Key for LocationIQ
const LOCATIONIQ_API_KEY = "pk.f3248883a6e9212524a3ed4d7620e737";

export default function SearchPlace() {
  const { trip, setTrip } = useContext(CreateTripContext); // Access trip state from context
  const navigation = useNavigation(); // Navigation helper
  const router = useRouter(); // Router helper to navigate to different screens

  const [query, setQuery] = useState(""); // State to hold the search query
  const [results, setResults] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(false); // Loading state for API request

  // Set header options when screen loads
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search Place",
    });
  }, [navigation]);

  // Function to search for locations based on user input
  const searchLocation = async (text) => {
    setQuery(text); // Update query state
    if (text.length < 3) return; // Trigger search only if the query has at least 3 characters

    setLoading(true); // Start loading animation
    try {
      // Fetch search results from LocationIQ API
      const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${text}&format=json`
      );
      const data = await res.json(); // Parse response data
      setResults(data); // Set search results
    } catch (error) {
      console.error("Error fetching places:", error); // Log any errors
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Handle selection of a place from search results
  const handleSelect = (item) => {
    setTrip((prev) => ({
      ...prev, // Retain previous state values
      location: item.display_name, // Add selected location to the trip state
    }));

    // Navigate to the next screen
    router.push("/create-trip/select-traveller");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#101820", // Darker background color for the screen
        padding: 25,
        paddingTop: 75, // Top padding for the header
      }}
    >
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#6366F1", // Accent color for input border
          borderRadius: 10,
          padding: 12,
          fontSize: 16,
          color: "#F5F5F5", // Light text color inside input
          marginBottom: 15,
          backgroundColor: "#1C1C27", // Dark background for input field
        }}
        placeholder="Search for a place"
        placeholderTextColor="#A1A1AA" // Soft placeholder text color
        value={query} // Bind query state to input
        onChangeText={searchLocation} // Trigger search on text change
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color="#22D3EE" // Neon accent color for loading indicator
          style={{ marginBottom: 10 }}
        />
      )}

      <FlatList
        data={results} // List of search results
        keyExtractor={(item, index) =>
          `${item.place_id || item.osm_id}-${index}`
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)} // Call handleSelect when a result is tapped
            style={{
              padding: 25,
              paddingVertical: 15,
              borderBottomColor: "#2D3748", // Dark separator between items
              borderBottomWidth: 1,
              backgroundColor: "#1C1C27", // Dark background for each list item
              borderRadius: 8, // Slightly rounded corners for list items
              marginBottom: 8, // Bottom margin between items
            }}
          >
            <Text style={{ fontSize: 16, color: "#F5F5F5" }}>
              {item.display_name} {/* Display location name */}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
