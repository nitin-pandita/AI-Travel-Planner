import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // For using icons

export default function HotelDetails({ hotelDetails }) {
  return (
    <View style={styles.container}>
      {/* Custom Heading with Icon */}
      <View style={styles.header}>
        <Icon name="bed" size={28} color="#64B5F6" style={styles.headerIcon} />
        <Text style={styles.headerText}>Hotel Details</Text>
      </View>

      <FlatList
        data={hotelDetails}
        renderItem={({ item, index }) => (
          <View style={styles.hotelCard}>
            {/* Hotel Image */}
            {item.hotelImage ? (
              <Image
                source={{ uri: item.hotelImage }}
                style={styles.hotelImage}
                resizeMode="cover"
              />
            ) : null}

            <View style={styles.hotelInfo}>
              {/* Hotel Name with Icon */}
              <View style={styles.infoRow}>
                <Icon
                  name="building"
                  size={18}
                  color="#64B5F6"
                  style={styles.infoIcon}
                />
                <Text style={styles.hotelName}>{item.hotelName}</Text>
              </View>

              {/* Hotel Address with Icon */}
              <View style={styles.infoRow}>
                <Icon
                  name="map-marker"
                  size={18}
                  color="#777"
                  style={styles.infoIcon}
                />
                <Text style={styles.address}>{item.address}</Text>
              </View>

              {/* Price with Icon */}
              <View style={styles.infoRow}>
                <Icon
                  name="usd"
                  size={18}
                  color="#999"
                  style={styles.infoIcon}
                />
                <Text style={styles.price}>
                  Price: <Text style={styles.priceValue}>{item.price}</Text>
                </Text>
              </View>

              {/* Rating with Icon */}
              <View style={styles.infoRow}>
                <Icon
                  name="star"
                  size={18}
                  color="#FFD700"
                  style={styles.infoIcon}
                />
                <Text style={styles.rating}>
                  Rating: <Text style={styles.ratingValue}>{item.rating}</Text>
                </Text>
              </View>

              {/* Book Now Button */}
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() =>
                  console.log("Book Now clicked for", item.hotelName)
                }
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  hotelCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 10,
  },
  hotelInfo: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    fontSize: 15,
    color: "#555",
  },
  price: {
    fontSize: 15,
    color: "#777",
  },
  priceValue: {
    color: "#2C6BED",
    fontWeight: "bold",
  },
  rating: {
    fontSize: 15,
    color: "#777",
  },
  ratingValue: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  bookButton: {
    backgroundColor: "#2C6BED",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
