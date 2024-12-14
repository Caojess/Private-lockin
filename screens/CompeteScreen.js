import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const CompeteScreen = ({ route, navigation }) => {
  const {
    id,
    name = "Unnamed Competition",
    competitors = [],
    screenLimit = "N/A",
    duration = "N/A",
    entryFee = "N/A",
    spots = "N/A",
    type = "unknown",
  } = route.params || {};

  // Helper function to resolve competitor images
  const resolveCompetitorImage = (imagePath) => {
    if (!imagePath) return require("../images/default-pfp.png"); // Default image
    return { uri: imagePath.trim() }; // Ensure the path is a valid URI
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Full-Width Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{name}</Text>
      </View>

      {/* Competition Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Entry Fee: ${entryFee}</Text>
        <Text style={styles.detailText}>Spots Left: {spots}</Text>
        <Text style={styles.detailText}>Type: {type}</Text>
      </View>

      {/* Competitors Section */}
      <Text style={styles.subheader}>Competitors</Text>
      <FlatList
        data={competitors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.competitorRow}>
            <Image
              source={resolveCompetitorImage(item.image)}
              style={styles.avatar}
              onError={() => console.warn("Error loading image", item.image)}
            />
            <Text style={styles.competitorName}>{item.name}</Text>
            <Text style={styles.competitorTime}>{item.hours} hours</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No competitors yet</Text>
        }
      />

      {/* Screen Limit & Duration */}
      <Text style={styles.limit}>
        Screen Limit: <Text style={styles.bold}>{screenLimit} hours / day</Text>
      </Text>
      <Text style={styles.limit}>
        Duration: <Text style={styles.bold}>next {duration} days</Text>
      </Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Join", { competitionId: id })}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  headerContainer: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DD3A3A",
    textAlign: "center",
    marginVertical: 8,
  },
  competitorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#DD3A3A",
    marginRight: 12,
  },
  competitorName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  competitorTime: {
    fontSize: 16,
    color: "#666",
  },
  limit: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  continueButton: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
    alignSelf: "center",
    width: "50%",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyList: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
});

export default CompeteScreen;
