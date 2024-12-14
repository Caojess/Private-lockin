import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../database/db";
import { CompetitionContext } from "../App";
import { UserContext } from "./UserContext";

const ViewCompetition = ({ navigation }) => {
  const [competitionData, setCompetitionData] = useState(null);
  const { currentCompetitionId } = useContext(CompetitionContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!currentCompetitionId) return;

    const competitionRef = doc(db, "competitionId", currentCompetitionId);
    const unsubscribe = onSnapshot(competitionRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log("Competition data:", data); // Debug log

        // Check for dropped competitors and update if necessary
        const updatedCompetitors = data.competitors.map((c) => ({
          ...c,
          dropped: c.dropped === true || c.screenTime >= 180,
        }));

        const activeCompetitors = updatedCompetitors.filter((c) => !c.dropped);

        if (
          JSON.stringify(updatedCompetitors) !==
          JSON.stringify(data.competitors)
        ) {
          // Update competitors' dropped status in Firestore
          await updateDoc(competitionRef, {
            competitors: updatedCompetitors,
          });

          // The updated data will be fetched in the next snapshot
        } else {
          setCompetitionData({ ...data, competitors: updatedCompetitors });
        }
      } else {
        console.log("No such competition!");
      }
    });

    return () => unsubscribe();
  }, [currentCompetitionId]);

  if (!competitionData) return <Text>Loading...</Text>;

  const droppedCompetitors = competitionData.competitors.filter(
    (c) => c.dropped
  );
  const activeCompetitors = competitionData.competitors.filter(
    (c) => !c.dropped
  );

  console.log("Dropped competitors:", droppedCompetitors); // Debug log
  console.log("Active competitors:", activeCompetitors); // Debug log

  const totalPot =
    parseFloat(competitionData.entryFee) * competitionData.competitors.length;
  const updatedPayout =
    activeCompetitors.length > 0
      ? totalPot / activeCompetitors.length
      : totalPot;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        ></TouchableOpacity>
      </View>

      {droppedCompetitors.map((dropped, index) => (
        <View key={index} style={styles.notification}>
          <Text style={styles.notificationText}>
            Competitor Dropped: {dropped.name}
          </Text>
          <Text style={styles.updatedPayout}>
            Updated Payout: ${updatedPayout.toFixed(2)}
          </Text>
        </View>
      ))}

      {activeCompetitors.map((competitor, index) => (
        <View key={index} style={styles.competitorRow}>
          <View style={styles.profileSection}>
            <Image
              source={
                competitor.image
                  ? { uri: competitor.image }
                  : require("../images/default-pfp.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.nameText}>
              {competitor.name === user.username ? "You" : competitor.name}
            </Text>
          </View>
          <View style={styles.progressSection}>
            <TouchableOpacity
              style={styles.compareButton}
              onPress={() =>
                navigation.navigate(
                  competitor.name === user.username
                    ? "Profile"
                    : `HeadToHead${competitor.name}`,
                  { fromStats: true }
                )
              }
            >
              <Text style={styles.compareText}>
                {competitor.name === user.username ? "My Stats" : "Compare"}
              </Text>
            </TouchableOpacity>

            <View style={styles.progressBarContainer}>
              <Text style={styles.timeLeft}>
                {formatTime(competitor.screenTime || 0)}
              </Text>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${
                        Math.min((competitor.screenTime || 0) / 180, 1) * 100
                      }%`,
                    },
                  ]}
                ></View>
              </View>
              <Text style={styles.timeGoal}>3:00</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  notification: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center", // Center horizontally
  },
  notificationText: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center", // Center text
  },
  updatedPayout: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },
  competitorRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  progressSection: {
    flex: 1,
  },
  compareButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  compareText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  timeLeft: {
    fontSize: 12,
    color: "#000",
    marginRight: 5,
  },
  timeGoal: {
    fontSize: 12,
    color: "#000",
    marginLeft: 5,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#d32f2f",
  },
});

export default ViewCompetition;
