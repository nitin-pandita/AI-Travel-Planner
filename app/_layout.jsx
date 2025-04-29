import { Stack } from "expo-router";
import { useState } from "react";
import { CreateTripContext } from "../context/CreateTripContext";

export default function RootLayout() {
  const [trip, setTrip] = useState({}); // Initialize as object, not array

  return (
    <CreateTripContext.Provider value={{ trip, setTrip }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </CreateTripContext.Provider>
  );
}
