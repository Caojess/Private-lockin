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

const FriendsScroll = ({ competitions }) => {
  const navigation = useNavigation();

  // Handle empty state
  if (competitions.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          No Friends Competitions Available
        </Text>
      </View>
    );
  }

  // Helper function to resolve image paths
  const resolveImagePath = (relativePath) => {
    switch (relativePath) {
      case "images/andy.png":
        return require("../images/andy.png");
      case "images/harper.png":
        return require("../images/harper.png");
      case "images/Mia.png":
        return require("../images/Mia.png");
      default:
        return require("../images/default-pfp.png"); // Default image
    }
  };

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
              source={
                competition.image
                  ? resolveImagePath(competition.image)
                  : require("../images/default-pfp.png")
              }
              style={styles.profileImage}
              onError={(e) =>
                console.log("Error loading main image:", e.nativeEvent.error)
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

          {/* View Button */}
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate("Compete", {
                id: competition.id,
                // Remove other props, we'll fetch them in CompeteScreen
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
    backgroundColor: "#DD3A3A",
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

export default FriendsScroll;
