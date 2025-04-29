import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectBudgetOptions } from "../../components/OptionList";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";
import { useRouter } from "expo-router";

export default function SelectBudget() {
  const [selectedOption, setSelectedOption] = useState();
  const { trip, setTrip } = useContext(CreateTripContext);
  const router = useRouter();
  useEffect(() => {
    selectedOption &&
      setTrip({
        ...trip,
        budget: selectedOption.title,
      });
  }, [selectedOption]);

  const onCLickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show("Select your Budget", ToastAndroid.LONG);
      return;
    }
    console.log("Demo");
    router.push("/create-trip/review-trip");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1C1C27", // Dark background for the dark theme
        paddingTop: 75,
        paddingHorizontal: 25,
        paddingBottom: 30,
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
          color: "#F5F5F5", // Light text for dark background
        }}
      >
        Budget
      </Text>

      <Text
        style={{
          fontSize: 20,
          color: "#A1A1AA", // Light grey text for secondary information
          marginTop: 20,
        }}
      >
        Choose Spending Habits for your Journey
      </Text>

      <FlatList
        data={SelectBudgetOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            activeOpacity={0.8}
            style={{
              marginTop: 15,
              borderRadius: 12,
              backgroundColor:
                selectedOption?.id === item.id ? "#6366F1" : "#3A3A4F", // Change color when selected
              paddingVertical: 15,
              paddingHorizontal: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: selectedOption?.id === item.id ? "#FFFFFF" : "#E4E4E7", // Light text when selected
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: selectedOption?.id === item.id ? "#FFFFFF" : "#A1A1AA", // Light grey text when selected
                fontSize: 14,
                marginTop: 5,
              }}
            >
              {item.desc}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={onCLickContinue}
        style={{
          backgroundColor: selectedOption ? "#6366F1" : "#3A3A4F",
          paddingVertical: 16,
          borderRadius: 12,
          marginTop: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 6,
          opacity: selectedOption ? 1 : 0.6,
        }}
        disabled={!selectedOption}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "600",
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
