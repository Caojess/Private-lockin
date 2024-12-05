import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Data for the app breakdown
const DATA = [
  {
    id: "1",
    app: "Instagram",
    you: "30 min",
    opponent: "45 min",
    icon: require("../images/instagram-icon.png"),
  },
  {
    id: "2",
    app: "Messages",
    you: "10 min",
    opponent: "43 min",
    icon: require("../images/message-icon.png"),
  },
  {
    id: "3",
    app: "TikTok",
    you: "47 min",
    opponent: "40 min",
    icon: require("../images/tiktok-icon.png"),
  },
  {
    id: "4",
    app: "YouTube",
    you: "10 min",
    opponent: "22 min",
    icon: require("../images/youtube-icon.png"),
  },
];

const HeadToHeadMiaScreen = () => {
  const isLower = (value1, value2) => {
    // Helper function to determine the lower value
    const num1 = parseInt(value1.replace(" min", ""));
    const num2 = parseInt(value2.replace(" min", ""));
    return num1 < num2;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Head to Head</Text>
        <Text style={styles.subtitle}>You vs. Mia Today</Text>
      </View>

      {/* Score Row */}
      <View style={styles.scoreRow}>
        {/* Your Section */}
        <View style={styles.user}>
          <Text style={styles.label}>You</Text>
          <Image source={require("../images/you.png")} style={styles.avatar} />
          <Text style={[styles.userTime, styles.bold]}>1:37</Text>
        </View>

        {/* Opponent Section */}
        <View style={styles.user}>
          <Text style={styles.label}>Mia</Text>
          <Image source={require("../images/Mia.png")} style={styles.avatar} />
          <Text style={[styles.userTime, styles.nonBold]}>2:30</Text>
        </View>
      </View>

      {/* Centered Total By App Header */}
      <Text style={styles.sectionHeader}>Total By App</Text>

      {/* App Breakdown as Grid */}
      <View style={styles.grid}>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.columnHeader, styles.leftColumn]}>You</Text>
          <Text style={styles.columnHeader}>App</Text>
          <Text style={[styles.columnHeader, styles.rightColumn]}>Mia</Text>
        </View>

        {/* Table Data */}
        {DATA.map((item) => (
          <View key={item.id} style={styles.row}>
            {/* Your Time */}
            <Text
              style={[
                styles.cellText,
                styles.leftColumn,
                isLower(item.you, item.opponent) ? styles.bold : styles.nonBold,
              ]}
            >
              {item.you}
            </Text>

            {/* App Icon and Name */}
            <View style={styles.cell}>
              <Image source={item.icon} style={styles.appIcon} />
              <Text style={styles.appName}>{item.app}</Text>
            </View>

            {/* Opponent's Time */}
            <Text
              style={[
                styles.cellText,
                styles.rightColumn,
                !isLower(item.you, item.opponent)
                  ? styles.bold
                  : styles.nonBold,
              ]}
            >
              {item.opponent}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  user: {
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userTime: {
    marginTop: 10,
    fontSize: 18,
  },
  bold: {
    fontWeight: "bold",
  },
  nonBold: {
    fontWeight: "normal",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  grid: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerRow: {
    backgroundColor: "#f9f9f9",
  },
  columnHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  cell: {
    flex: 1,
    alignItems: "center",
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  appIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  appName: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  leftColumn: {
    textAlign: "left",
    paddingLeft: 15,
  },
  rightColumn: {
    textAlign: "right",
    paddingRight: 15,
  },
});

export default HeadToHeadMiaScreen;
