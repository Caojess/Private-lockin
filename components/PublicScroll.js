import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Helper function to resolve image paths
const resolveImagePath = (relativePath) => {
  switch (relativePath) {
    case "images/Mia.png":
      return require("../images/Mia.png");
    case "images/Autumn.png":
      return require("../images/Autumn.png");
    case "images/amanda.png":
      return require("../images/amanda.png");
    case "images/Reginor.png":
      return require("../images/Reginor.png");
    default:
      return require("../images/default-pfp.png"); // Default fallback image
  }
};

const PublicScroll = ({ competitions }) => {
  const navigation = useNavigation();

  // Handle empty state
  if (competitions.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          No Public Competitions Available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.horizontalScroll}
    >
      {competitions.map((competition) => (
        <View key={competition.id} style={styles.card}>
          {/* Main Image for Competition */}
          <View style={styles.avatarContainer}>
            <Image
              source={resolveImagePath(competition.image)} // Dynamically resolve image path
              style={styles.profileImage}
              onError={(e) =>
                console.log(
                  `Error loading image for ${competition.name}:`,
                  e.nativeEvent.error
                )
              }
            />
          </View>

          {/* Competition Details */}
          <Text style={styles.cardTitle}>{competition.name}</Text>
          <Text style={styles.cardSubTitle}>{`$${competition.entryFee}`}</Text>
          <Text style={styles.cardDetails}>
            {`<${competition.screenLimit} hours for ${
              competition.duration
            } day${competition.duration > 1 ? "s" : ""}`}
          </Text>
          <Text style={styles.cardDetails}>
            {`${competition.spots} spot${
              competition.spots > 1 ? "s" : ""
            } left`}
          </Text>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate("Compete", {
                id: competition.id,
                name: competition.name,
                competitors: competition.competitors,
                screenLimit: competition.screenLimit,
                duration: competition.duration,
                entryFee: competition.entryFee,
                spots: competition.spots,
                type: competition.type,
                mainImage: competition.image,
              })
            }
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    marginVertical: 5,
    paddingHorizontal: 16,
  },
  card: {
    width: 200,
    height: 220,
    backgroundColor: "#EE9B9B",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
    textAlign: "center",
  },
  cardSubTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
    textAlign: "center",
  },
  cardDetails: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginBottom: 2,
  },
  viewButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  viewButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  emptyState: {
    padding: 16,
    alignItems: "center",
  },
  emptyStateText: {
    color: "#999",
    fontSize: 16,
  },
});

export default PublicScroll;
