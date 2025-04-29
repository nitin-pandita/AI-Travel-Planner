import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function TripPlan({ tripPlan }) {
  if (!Array.isArray(tripPlan)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No trip plan available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Trip Plan ✈️</Text>

      {tripPlan.length > 0 ? (
        tripPlan.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>Day {day.day}</Text>
              <View style={styles.timeBadge}>
                <FontAwesome name="clock-o" size={12} color="#5E8BFF" />
                <Text style={styles.bestTimeText}> {day.bestTimeToVisit}</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Activities</Text>

            {day.activities.map((activity, idx) => (
              <View key={idx} style={styles.activityItem}>
                <FontAwesome name="circle" size={8} color="#5E8BFF" />
                <Text style={styles.activityText}> {activity}</Text>
              </View>
            ))}

            {index < tripPlan.length - 1 && <View style={styles.divider} />}
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome name="map-o" size={40} color="#D3D3D3" />
          <Text style={styles.noDataText}>No activities planned yet</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F5FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestTimeText: {
    fontSize: 12,
    color: "#5E8BFF",
    fontWeight: "500",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 4,
  },
  activityText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: 20,
  },
});
