import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../database/db";
import { CompetitionContext } from "../App"; // Adjust the import path as needed
import { UserContext } from "./UserContext"; // Adjust the import path as needed

const CurrentGameScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 1 minute in seconds for demo
  const [competitionData, setCompetitionData] = useState(null);
  const { currentCompetitionId } = useContext(CompetitionContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!currentCompetitionId) return;

    const competitionRef = doc(db, "competitionId", currentCompetitionId);
    const unsubscribe = onSnapshot(competitionRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setCompetitionData(data);
      } else {
        console.log("No such competition!");
      }
    });

    return () => unsubscribe();
  }, [currentCompetitionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  if (!competitionData) {
    return <Text>Loading...</Text>;
  }

  const currentUserData =
    competitionData.competitors.find((c) => c.name === user.username) || {};
  const progressPercentage =
    (currentUserData.screenTime || 0) / (competitionData.screenLimit * 60);

  // Calculate payout based on remaining active competitors
  const activeCompetitors = competitionData.competitors.filter(
    (c) => !c.dropped
  );
  const totalPot =
    parseFloat(competitionData.entryFee) * competitionData.competitors.length;
  const currentPayout =
    activeCompetitors.length > 0
      ? totalPot / activeCompetitors.length
      : totalPot;

  return (
    <View style={styles.container}>
      <View style={styles.todayBox}>
        <View style={styles.row}>
          <Text style={styles.todayText1}>
            Time spent: {currentUserData.screenTime || 0} mins{" "}
          </Text>
          <Text style={styles.todayText2}>
            {" "}
            Goal: &lt; {competitionData.screenLimit} Hours
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[styles.progress, { width: `${progressPercentage * 100}%` }]}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.payoutText}>
            Current Payout: ${currentPayout}
          </Text>
          <Text style={styles.participantsIcon}>
            {activeCompetitors.length} 👤
          </Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        <Svg width={300} height={300} viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="#F5F5F5"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="#DD3A3A"
            strokeWidth="10"
            fill="none"
            strokeDasharray="565"
            strokeDashoffset={(1 - timeLeft / 60) * 565}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.timerTextContainer}>
          <Text style={styles.dayText}>Day {competitionData.duration}</Text>
          <Text style={styles.timeLeftText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ViewCompetition", {
            competitionId: currentCompetitionId,
          })
        }
      >
        <Text style={styles.buttonText}>View Competition</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  todayBox: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#FAD4D4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  todayText1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  todayText2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  payoutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  participantsIcon: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    marginVertical: 8,
    overflow: "hidden",
  },
  progress: {
    height: 10,
    backgroundColor: "#DD3A3A",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  timerTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 110,
  },
  dayText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  timeLeftText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  button: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CurrentGameScreen;
