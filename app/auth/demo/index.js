import { View, Text } from "react-native";
import React from "react";
import { GoogleGenAI } from "@google/genai";

export default function demo() {
  const GEMINI_API_KEY = "AIzaSyBXVDBAwTSX40iU992GBNly - hNeTYD9lE4";

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: "Why is the sky blue?",
    });
    console.log(response.text);
  }

  main();
  return (
    <View>
      <Text>demo</Text>
    </View>
  );
}
