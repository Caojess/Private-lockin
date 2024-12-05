import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation(); // Get the navigation object
  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    "This Week": {
      general: [2.5, 3, 2.8, 3.2, 3, 2.7, 2.9],
      tiktok: [1, 1.2, 1.1, 1.3, 1.2, 1.1, 1],
      messages: [0.8, 0.9, 0.7, 1, 0.9, 0.8, 0.7],
      instagram: [1.2, 1.3, 1.1, 1.4, 1.2, 1.1, 1.3],
      labels: ["M", "T", "W", "T", "F", "Sa", "Su"],
    },
    "This Month": {
      general: [3, 2.9, 3.1, 3],
      tiktok: [1.2, 1.1, 1.3, 1.2],
      messages: [0.9, 0.8, 1, 0.9],
      instagram: [1.3, 1.2, 1.4, 1.3],
      labels: ["W1", "W2", "W3", "W4"],
    },
    "Past 6 Months": {
      general: [3, 3.1, 2.9, 3, 3.2, 3.1],
      tiktok: [1.2, 1.3, 1.1, 1.2, 1.4, 1.3],
      messages: [0.9, 0.8, 0.9, 1, 0.9, 0.8],
      instagram: [1.3, 1.4, 1.2, 1.3, 1.5, 1.4],
      labels: ["J", "A", "S", "O", "N", "D"],
    },
    "Past Year": {
      general: [2.9, 3, 3.1, 2.8, 3, 2.9, 3, 3.1, 3.2, 3, 2.9, 3],
      tiktok: [1.1, 1.2, 1.3, 1, 1.2, 1.1, 1.3, 1.4, 1.2, 1.3, 1.2, 1.3],
      messages: [0.8, 0.9, 0.7, 0.8, 0.9, 0.7, 0.8, 1, 0.9, 0.8, 0.9, 1],
      instagram: [1.3, 1.2, 1.4, 1.3, 1.5, 1.4, 1.3, 1.6, 1.4, 1.5, 1.4, 1.5],
      labels: [
        "Ja",
        "Fe",
        "Ma",
        "Ap",
        "Ma",
        "Ju",
        "Jul",
        "Au",
        "Se",
        "Oc",
        "No",
        "De",
      ],
    },
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState("This Week");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    setDropdownVisible(false);
  };

  const formatAverage = (data) => {
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const hours = Math.floor(avg);
    const minutes = Math.round((avg - hours) * 60);
    return `${hours} hour${hours !== 1 ? "s" : ""} ${
      minutes > 0 ? `${minutes} min` : ""
    }`;
  };

  const data = chartData[selectedTimeframe];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require("../images/Mia.png")} // Profile picture
            style={styles.profileImage}
          />
          <Text style={styles.title}>Mia Jones</Text>
          <Text style={styles.subtitle}>San Francisco, CA</Text>
          {/* Smaller subtitle */}
        </View>

        {/* Money Section */}
        <View style={styles.generalBanner}>
        <Text style={styles.sectionTitle}>
          {`Current Balance: `}
          <Text style={styles.sectionText}>$45</Text>
        </Text>

        </View>

        {/* Dropdown Section */}
        <View>89
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setDropdownVisible(!isDropdownVisible)}
          >
            <Text style={styles.dropdownText}>{selectedTimeframe}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {isDropdownVisible && (
            <View style={styles.dropdownOptions}>
              {Object.keys(chartData).map(
                (timeframe) =>
                  timeframe !== selectedTimeframe && (
                    <TouchableOpacity
                      key={timeframe}
                      onPress={() => handleTimeframeChange(timeframe)}
                      style={styles.dropdownOption}
                    >
                      <Text style={styles.dropdownOptionText}>{timeframe}</Text>
                    </TouchableOpacity>
                  )
              )}
            </View>
          )}
        </View>

        {/* General Analytics Section */}
        <View style={styles.generalBanner}>
          <Text style={styles.sectionTitle}>General Analytics</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={{
                labels: data.labels,
                datasets: [{ data: data.general }],
              }}
              width={screenWidth - 80}
              height={220}
              fromZero
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        </View>

        {/* TikTok Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>
            Your daily TikTok average was {formatAverage(data.tiktok)}
          </Text>
          <View style={styles.timeSpentContainer}>
            <Image
              source={require("../images/tiktok-icon.png")}
              style={styles.icon}
            />
            <BarChart
              data={{
                labels: data.labels,
                datasets: [{ data: data.tiktok }],
              }}
              width={screenWidth - 120}
              height={180}
              fromZero
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        </View>

        {/* iMessage Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>
            Your daily Message average was {formatAverage(data.messages)}
          </Text>
          <View style={styles.timeSpentContainer}>
            <Image
              source={require("../images/message-icon.png")}
              style={styles.icon}
            />
            <BarChart
              data={{
                labels: data.labels,
                datasets: [{ data: data.messages }],
              }}
              width={screenWidth - 120}
              height={180}
              fromZero
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        </View>

        {/* Instagram Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>
            Your daily Instagram average was {formatAverage(data.instagram)}
          </Text>
          <View style={styles.timeSpentContainer}>
            <Image
              source={require("../images/instagram-icon.png")}
              style={styles.icon}
            />
            <BarChart
              data={{
                labels: data.labels,
                datasets: [{ data: data.instagram }],
              }}
              width={screenWidth - 120}
              height={180}
              fromZero
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate("Login")} // Navigate to LoginScreen
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(221, 58, 58, ${opacity})`, // Correctly formatted template literal
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Correctly formatted template literal
  barPercentage: 0.35, // Increased for slightly wider bars
  fillShadowGradient: "#DD3A3A",
  fillShadowGradientOpacity: 1,
  propsForLabels: {
    fontSize: 10, // Reduced font size for x-axis labels
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DD3A3A",
    flex: 1,
    marginLeft: 10,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "#000",
  },
  dropdownOptions: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginTop: 5,
    paddingVertical: 5,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#000",
  },
  generalBanner: {
    backgroundColor: "rgba(220, 53, 69, 0.5)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 8, // Reduced from the previous value to shift the icons left slightly
  },
  compressedBanner: {
    backgroundColor: "rgba(220, 53, 69, 0.5)",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#000",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  chart: {
    borderRadius: 10,
    marginVertical: 10,
  },
  timeSpentContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensure vertical alignment
    justifyContent: "space-between", // Adjust spacing between items
    marginHorizontal: 15,
    paddingVertical: 10, // Add padding for better spacing
  },
  logoutButtonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
