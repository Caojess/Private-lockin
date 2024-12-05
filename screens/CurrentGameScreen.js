import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const CurrentGameScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(36000); // 10 hours in seconds

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins.toString().padStart(2, "0")}m ${secs
      .toString()
      .padStart(2, "0")}s`;
  };

  const progressPercentage = (timeLeft / 36000) * 100; // Based on 10-hour duration

  return (
    <View style={styles.container}>
      {/* Header */}
    
      {/* Today Progress Box */}
      <View style={styles.todayBox}>
        <View style={styles.todayRow}>
          <Text style={styles.todayText}>Current Screen Time: 40 mins</Text>
          <Text style={styles.todayText}>Daily Goal: 3 hours</Text>
          <Text style={styles.todayText}>Current Payout: $20</Text>
          <Text style={styles.todayGoal}>4 competitors remaining</Text>
        </View>
      </View>

      <Text style={styles.stitle}>Competition Countdown</Text>
      {/* Circular Timer */}
      <View style={styles.timerSection}>
        <Svg width={300} height={300} viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="#ddd"
            strokeWidth="1"
            fill="none"
          />
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="#DD3A3A"
            strokeWidth="10"
            fill="none"
            strokeDasharray="565" // Circumference of the circle
            strokeDashoffset={(1 - progressPercentage / 100) * 565}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerDay}>Day 2</Text>
          <Text style={styles.timerCountdown}>{formatTime(timeLeft)}</Text>
        </View>
      </View>
      {/* View Competition Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ViewCompetition")} // Navigate to ViewCompetition screen
      >
        <Text style={styles.buttonText}>View Competition</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 0, // Leave room for the title
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: -10,
  },
  infoButton: {
    padding: 8,
  },
  stitle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#DD3A3A",
    marginBottom: 16,
  },
  todayBox: {
    marginTop: 30,
    width: "90%",
    height: 200,
    backgroundColor: "#FAD4D4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  todayRow: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginTop: 20,
  },
  todayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  todayGoal: {
    fontSize: 14,
    color: "#555",
  },
  todayPayout: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  participantsIcon: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timerSection: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  timerTextContainer: {
    position: "absolute",
    top: "38%",
    left: "20.5%",
    alignItems: "center",
  },
  timerDay: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  timerCountdown: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  button: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CurrentGameScreen;
