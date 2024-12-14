import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../database/db";
import { CompetitionContext } from "../App"; // Adjust the import path as needed
import { UserContext, updateBalanceInFirestore } from "./UserContext"; // Adjust the import path as needed

const CurrentGameScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds for demo
  const [competitionData, setCompetitionData] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winners, setWinners] = useState([]);
  const { currentCompetitionId, setInCompetition, setCurrentCompetitionId } =
    useContext(CompetitionContext);
  const { user, updateBalanceInFirestore } = useContext(UserContext);

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
      setTimeLeft((prev) => {
        console.log("Time left:", prev); // Add this log
        if (prev <= 1) {
          clearInterval(interval);
          console.log("Timer reached zero, calling handleCompetitionEnd"); // Add this log
          handleCompetitionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCompetitionEnd = async () => {
    if (!competitionData) return;

    const activeCompetitors = competitionData.competitors.filter(
      (c) => !c.dropped && c.screenTime < 180
    );
    setWinners(activeCompetitors);
    setShowWinnerModal(true);

    // Update competition status in Firestore
    const compRef = doc(db, "competitionId", currentCompetitionId);
    await updateDoc(compRef, {
      status: "completed",
      winners: activeCompetitors.map((c) => c.name),
    });
  };

  const handleClaimPayout = async () => {
    const totalPot =
      parseFloat(competitionData.entryFee) * competitionData.competitors.length;
    const payout = winners.length > 0 ? totalPot / winners.length : 0;

    if (winners.some((w) => w.name === user.username)) {
      try {
        await updateBalanceInFirestore(user.userId, payout);
        Alert.alert(
          "Success",
          `$${payout.toFixed(2)} has been added to your account!`
        );
      } catch (error) {
        console.error("Error updating balance:", error);
        Alert.alert("Error", "Failed to update balance. Please try again.");
      }
    }

    setShowWinnerModal(false);
    setInCompetition(false);
    setCurrentCompetitionId(null);
    navigation.navigate("Home");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  const CIRCLE_LENGTH = 2 * Math.PI * 90; // Circumference of the circle
  const TOTAL_TIME = 60; // Total time in seconds

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
            Current Payout: ${currentPayout.toFixed(2)}
          </Text>
          <Text style={styles.participantsIcon}>
            {activeCompetitors.length} 👤
          </Text>
        </View>
      </View>

      {/* Countdown Timer */}
      <View style={styles.timerContainer}>
        <Svg width={300} height={300} viewBox="0 0 200 200">
          <G rotation="-90" origin="100, 100">
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
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={CIRCLE_LENGTH * (1 - timeLeft / TOTAL_TIME)}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.timerTextContainer}>
          <Text style={styles.dayText}>
            Day {competitionData?.duration || 3}
          </Text>
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

      {/* Conditionally render the button */}
      {timeLeft === 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowWinnerModal(true)}
        >
          <Text style={styles.buttonText}>Game Recap</Text>
        </TouchableOpacity>
      )}

      {/* Winner Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showWinnerModal}
        onRequestClose={() => setShowWinnerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Competition Ended!</Text>
            <Text style={styles.modalText}>Winners:</Text>
            {winners.map((winner, index) => (
              <Text key={index} style={styles.winnerText}>
                {winner.name}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.claimButton}
              onPress={handleClaimPayout}
            >
              <Text style={styles.claimButtonText}>
                Claim ${currentPayout} Payout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#DD3A3A",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000",
    fontWeight: "bold",
  },
  winnerText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  claimButton: {
    backgroundColor: "#DD3A3A",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  claimButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CurrentGameScreen;
