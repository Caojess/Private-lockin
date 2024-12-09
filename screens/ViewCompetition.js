import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ViewCompetition = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        ></TouchableOpacity>

        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Competitor Dropped Notification */}
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Competitor Dropped: Andy</Text>
        <Text style={styles.updatedPayout}>Updated Payout: $20</Text>
      </View>

      {/* Competitor Rows */}
      <View style={styles.competitorRow}>
        {/* You */}
        <View style={styles.profileSection}>
          <Image source={require("../images/you.png")} style={styles.avatar} />
          <Text style={styles.nameText}>You</Text>
        </View>
        <View style={styles.progressSection}>
          <TouchableOpacity
            style={styles.compareButton}
            onPress={() => navigation.navigate("Profile", { fromStats: true })}
          >
            <Text style={styles.compareText}>My Stats</Text>
          </TouchableOpacity>

          <View style={styles.progressBarContainer}>
            <Text style={styles.timeLeft}>0:40</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "25%" }]}></View>
            </View>
            <Text style={styles.timeGoal}>3:00</Text>
          </View>
        </View>
      </View>

      <View style={styles.competitorRow}>
        {/* Mia */}
        <View style={styles.profileSection}>
          <Image source={require("../images/Mia.png")} style={styles.avatar} />
          <Text style={styles.nameText}>Mia</Text>
        </View>
        <View style={styles.progressSection}>
          <TouchableOpacity
            style={styles.compareButton}
            onPress={() => navigation.navigate("HeadToHeadMia")}
          >
            <Text style={styles.compareText}>Compare</Text>
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <Text style={styles.timeLeft}>00:45</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "25%" }]}></View>
            </View>
            <Text style={styles.timeGoal}>3:00</Text>
          </View>
        </View>
      </View>

      <View style={styles.competitorRow}>
        {/* Harper */}
        <View style={styles.profileSection}>
          <Image
            source={require("../images/harper.png")}
            style={styles.avatar}
          />
          <Text style={styles.nameText}>Harper</Text>
        </View>
        <View style={styles.progressSection}>
          <TouchableOpacity
            style={styles.compareButton}
            onPress={() => navigation.navigate("HeadToHeadHarper")}
          >
            <Text style={styles.compareText}>Compare</Text>
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <Text style={styles.timeLeft}>02:30</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "83%" }]}></View>
            </View>
            <Text style={styles.timeGoal}>3:00</Text>
          </View>
        </View>
      </View>
    </View>
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
