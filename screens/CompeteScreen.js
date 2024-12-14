import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/db"; // Ensure the path to your Firebase setup is correct

const resolveImagePath = (relativePath) => {
  switch (relativePath) {
    case "images/Mia.png":
      return require("../images/Mia.png");
      case "images/andy.png":
      return require("../images/andy.png");
      case "images/Zach.png":
      return require("../images/Zach.png");
    case "images/Autumn.png":
      return require("../images/amanda.png");
      case "images/images/harper.png":
      return require("../images/harper.png");
    case "images/Emma.png":
      return require("../images/Bridgerton.png");
    case "images/Salvadore.png":
      return require("../images/Salvadore.png");
    default:
      return require("../images/default-pfp.png"); // Default fallback image
  }
};

const CompeteScreen = ({ route, navigation }) => {
  const [competitionData, setCompetitionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const docRef = doc(db, "competitionId", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCompetitionData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such competition!");
        }
      } catch (error) {
        console.error("Error fetching competition data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionData();
  }, [id]);

  const renderCompetitor = ({ item }) => {
    const avatarSource = resolveImagePath(item.image);

    // Handle hours that might be stored as strings or numbers
    const hours =
      item.hours !== null && item.hours !== undefined
        ? typeof item.hours === "string"
          ? parseFloat(item.hours)
          : item.hours
        : null;

    return (
      <View style={styles.competitorRow}>
        <Image source={avatarSource} style={styles.avatar} />
        <Text style={styles.competitorName}>{item.name}</Text>
        <Text style={styles.competitorTime}>
          {hours !== null ? `${hours} hrs` : "--"}
        </Text>
      </View>
    );
  };

  if (!competitionData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No competition data available</Text>
      </View>
    );
  }

  const {
    name,
    competitors = [],
    screenLimit,
    duration,
    entryFee,
  } = competitionData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{name}</Text>
      </View>

      <Text style={styles.subheader}>Competitors</Text>
      <FlatList
        data={competitors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCompetitor}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No competitors yet</Text>
        }
      />

      <Text style={styles.limit}>
        Screen Limit: <Text style={styles.bold}>{screenLimit} hours / day</Text>
      </Text>
      <Text style={styles.limit}>
        Duration: <Text style={styles.bold}>next {duration} days</Text>
      </Text>

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
