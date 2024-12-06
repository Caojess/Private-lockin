import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FriendsScroll from "../components/FriendsScroll";
import PublicScroll from "../components/PublicScroll";

const HomeScreen = ({ navigation, route }) => {
  const [myCompetitions, setMyCompetitions] = useState([]);
  const mockCompetitions = [
    {
      id: 1,
      name: "Andy's $15 Competition",
      participants: "Mia and Alexa",
      time: "Under 3 Hours For 1 Day",
      spots: "1/4 Spots Left",
    },
    {
      id: 2,
      name: "Ingrid's $20 Competition",
      participants: "Jenn and Emma",
      time: "Under 5 Hours For 2 Days",
      spots: "2/5 Spots Left",
    },
  ];

  React.useEffect(() => {
    if (route.params?.newCompetition) {
      setMyCompetitions((prev) => [route.params.newCompetition, ...prev]);
    }
  }, [route.params?.newCompetition]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Browse Competitions</Text>
      <View style={styles.lockInBucksButton}>
          <Text style={styles.lockInBucksText}>LockIn Bucks: $40</Text>
        </View>


      {myCompetitions.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>My Competitions</Text>
          {myCompetitions.map((competition) => (
            <View key={competition.id} style={styles.competitionCard}>
              <Text style={styles.competitionName}>{competition.name}</Text>
              <Text style={styles.competitionParticipants}>
                {competition.participants.toUpperCase()}
              </Text>
              <Text style={styles.competitionDetails}>
                {competition.time}
                numberOfLines={1}
              </Text>
              <Text style={styles.competitionSpots}>{competition.spots}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() =>
                  navigation.navigate("MyCompetitionDetails", { competition })
                }
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}
      <Text style={styles.sectionTitle}>Your Friends</Text>

      
      <FriendsScroll competitions={mockCompetitions} />

      <Text style={[styles.sectionTitle, styles.localPublicSpacing]}>
        Local & Public
      </Text>
      <PublicScroll competitions={mockCompetitions} />

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
  lockInBucks: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginLeft: 8,
  },
  friendsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  competitionCard: {
    backgroundColor: "#FCE9E9",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
  },
  competitionName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#DD3A3A",
    textTransform: "uppercase", // Ensures ALL CAPS
    overflow: "hidden", // Needed for truncation
    textAlign: "left",
  },
  competitionParticipants: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  competitionDetails: {
    fontSize: 14,
    color: "#000",
  },
  competitionSpots: {
    fontSize: 12,
    color: "#777",
  },
  viewButton: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
  localPublicSpacing: {
    marginTop: 30, // Creates more space between "Your Friends" section and "Local & Public"
  },
  lockInBucksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  lockInBucksButton: {
    alignSelf: "center",
    backgroundColor: "#FCE9E9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  lockInBucksText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default HomeScreen;
