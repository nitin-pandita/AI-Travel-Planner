import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { CreateTripContext } from "../../context/CreateTripContext";
import { useRouter } from "expo-router";

export default function SelectDates() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { trip, setTrip } = useContext(CreateTripContext);
  const router = useRouter();
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
      setEndDate(null);
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelection = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show(
        "Please select both start and end date",
        ToastAndroid.SHORT
      );
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, "days");

    setTrip({
      ...trip,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays + 1,
    });

    router.push("/create-trip/select-budget");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#101820", // deep navy background
        paddingHorizontal: 24,
        paddingTop: 75,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          color: "#F1F5F9",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Select travel dates
      </Text>

      <View style={{ marginBottom: 20 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedDayColor="#22D3EE" // neon teal
          selectedDayTextColor="#000000"
          todayBackgroundColor="#334155"
          textStyle={{
            color: "#CBD5E1",
            fontSize: 16,
          }}
          dayShape="circle"
          width={380}
        />
      </View>

      {startDate && endDate && (
        <Text
          style={{
            color: "#A5F3FC",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Trip: {startDate.format("MMM D")} → {endDate.format("MMM D")} (
          {endDate.diff(startDate, "days") + 1} days)
        </Text>
      )}

      <TouchableOpacity
        onPress={onDateSelection}
        disabled={!startDate || !endDate}
        style={{
          backgroundColor: !startDate || !endDate ? "#334155" : "#22D3EE",
          paddingVertical: 16,
          borderRadius: 14,
          shadowColor: "#22D3EE",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 8,
          opacity: !startDate || !endDate ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: "#0F172A",
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
