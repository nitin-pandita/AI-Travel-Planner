import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";

export default function OptionCard({ option, SelectTraveller }) {
  const isSelected = SelectTraveller === option.title;

  return (
    <View
      style={[
        {
          backgroundColor: isSelected ? Colors.WHITE : Colors.DARK_CARD_ALT, // white when selected, light-dark otherwise
          padding: 20,
          marginVertical: 10,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 4,
        },
        isSelected && {
          borderWidth: 2,
          borderColor: Colors.Primary,
        },
      ]}
    >
      <Ionicons
        name={option.icon}
        size={30}
        color={isSelected ? Colors.Primary : Colors.WHITE}
        style={{ marginRight: 15 }}
      />
      <View>
        <Text
          style={{
            color: isSelected ? Colors.BLACK : Colors.WHITE,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {option.title}
        </Text>
        <Text
          style={{
            color: isSelected ? Colors.BLACK : Colors.GRAY,
            fontSize: 14,
            marginTop: 4,
          }}
        >
          {option.description}
        </Text>
      </View>
    </View>
  );
}
