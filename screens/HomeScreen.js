import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FriendsScroll from "../components/FriendsScroll";
import PublicScroll from "../components/PublicScroll";
import { db } from "../database/db"; // Adjust import if needed
import { collection, getDocs } from "firebase/firestore"; // Firestore imports
import { UserContext } from "./UserContext";

const HomeScreen = ({ navigation, route }) => {
  const [competitions, setCompetitions] = useState([]); // All competitions
  const { user } = useContext(UserContext);

  // Fetch competitions from Firestore
  const fetchCompetitions = async () => {
    try {
      console.log("Fetching competitions from Firestore...");
      const querySnapshot = await getDocs(collection(db, "competitionId"));
      if (querySnapshot.empty) {
        console.log("No competitions found in Firestore.");
      } else {
        querySnapshot.forEach((doc) => {
          console.log("Competition:", doc.id, "=>", doc.data());
        });
      }
      const fetchedCompetitions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Competitions:", fetchedCompetitions);
      setCompetitions(fetchedCompetitions);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

  // Call fetchCompetitions when the component mounts
  useEffect(() => {
    fetchCompetitions();
  }, []);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Browse Competitions</Text>
      <View style={styles.lockInBucksButton}>
        <Text style={styles.lockInBucksText}>
          LockIn Bucks: ${user.fakeMoney}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FriendsScroll
        competitions={competitions.filter((comp) => comp.type === "friends")}
      />

      <Text style={[styles.sectionTitle, styles.localPublicSpacing]}>
        Local & Public
      </Text>
      <PublicScroll
        competitions={competitions.filter((comp) => comp.type === "public")}
      />

      <TouchableOpacity
        style={styles.createCustomButton}
        onPress={() => navigation.navigate("SetupCompetition")}
      >
        <Text style={styles.createCustomText}>Create Custom</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#DD3A3A",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  lockInBucksText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  lockInBucksButton: {
    alignSelf: "center",
    backgroundColor: "#FCE9E9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  createCustomButton: {
    marginTop: 10,
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 90,
  },
  createCustomText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
