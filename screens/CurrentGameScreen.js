import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CurrentGameScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(54000); // 15 hours in seconds

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

  const progressPercentage = 40 / 180; // Example: 40 mins out of 3 hours

  return (
    <View style={styles.container}>
      {/* Today Progress */}
      <View style={styles.todayBox}>
        <View style={styles.row}>
          <Text style={styles.todayText1}>40 mins today</Text>
          <Text style={styles.todayText2}> Daily Goal: 3 hours</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: `${progressPercentage * 100}%` },
            ]}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.payoutText}>Current Payout: $15</Text>
          <Text style={styles.participantsIcon}>4 ppl left</Text>
        </View>
      </View>

      {/* Countdown Timer */}
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
            strokeDashoffset={(1 - timeLeft / 54000) * 565}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.timerTextContainer}>
          <Text style={styles.dayText}>Day 2</Text>
          <Text style={styles.timeLeftText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* View Competition Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ViewCompetition")}
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  todayText2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  payoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
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