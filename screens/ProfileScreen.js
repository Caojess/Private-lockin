import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
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
      labels: ["Jul", "Au", "Se", "Oc", "No", "De"],
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

  // adding the additional bank account
  const [balance, setBalance] = useState(25); // Initial balance set to $25
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBalance, setNewBalance] = useState(""); // Track the input for new balance

  const handleBalanceUpdate = () => {
    if (newBalance && !isNaN(newBalance)) {
      setBalance((prevBalance) => prevBalance + parseFloat(newBalance)); // Add funds to balance
      setIsModalVisible(false); // Close the modal
      setNewBalance(""); // Clear input
    }
  };

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    setDropdownVisible(false);
  };

  const formatAverage = (data) => {
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const hours = Math.floor(avg); // Get whole hours
    const minutes = Math.round((avg - hours) * 60); // Get the remainder as minutes

    let formattedTime = `${hours} hour${hours !== 1 ? "s" : ""}`; // Handle plural form
    if (minutes > 0) {
      formattedTime += ` ${minutes} min`;
    }

    // This ensures that times like 0.8 hours get properly displayed as minutes, not as a fraction
    if (hours === 0 && minutes === 0) {
      formattedTime = "0 min"; // Case when both hours and minutes round to zero
    }

    return formattedTime;
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
          <Text style={styles.title}>Julia L. </Text>
          <Text style={styles.subtitle}>San Francisco, CA</Text>
          {/* Smaller subtitle */}
        </View>

        {/* Balance Section */}
        <View>
          <View style={styles.balanceContainer}>
            <Text style={styles.sectionTitle}>
              Current Balance:{" "}
              <Text style={styles.sectionText}>${balance}</Text>
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsModalVisible(!isModalVisible)} // Toggle modal visibility
            >
              <Text style={styles.addButtonText}>Add Funds</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally Render Modal Section */}
          {isModalVisible && (
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Enter Amount to Add</Text>
              <TextInput
                style={styles.modalInput}
                keyboardType="numeric"
                value={newBalance}
                onChangeText={setNewBalance}
                placeholder="Enter amount"
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleBalanceUpdate}
              >
                <Text style={styles.modalButtonText}>Add from bank</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            onPress={() => setDropdownVisible(!isDropdownVisible)}
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>{selectedTimeframe}</Text>
            <Text style={styles.dropdownArrow}>
              {isDropdownVisible ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
          {isDropdownVisible && (
            <View style={styles.dropdownOptions}>
              {Object.keys(chartData).map((timeframe) => (
                <TouchableOpacity
                  key={timeframe}
                  style={styles.dropdownOption}
                  onPress={() => handleTimeframeChange(timeframe)}
                >
                  <Text style={styles.dropdownOptionText}>{timeframe}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* General Analytics Section */}
        <View style={styles.generalBanner}>
          <Text style={styles.sectionTitle}>
            General Analytics {selectedTimeframe}
          </Text>
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
            Your spent an average of {formatAverage(data.tiktok)} per day on
            TikTok
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
            You spent an average of {formatAverage(data.messages)} per day on
            iMessage
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
            You spent an average of {formatAverage(data.instagram)} per day on
            Instagram
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
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "#000",
    marginLeft: 15,
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
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    alignSelf: "center",
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

  addButton: {
    backgroundColor: "#DD3A3A",
    padding: 10,
    borderRadius: 5,
    marginLeft: -30, // Move left slightly
    marginTop: -5, // Move higher slightly
    alignSelf: "center", // Ensure alignment relative to parent container
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  modal: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#DD3A3A",
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceContainer: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space between balance and button
    marginBottom: 10, // Add spacing below
  },
  generalBanner: {
    backgroundColor: "rgba(220, 53, 69, 0.5)",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15, // Add extra spacing when modal is visible
  },
  modalContainer: {
    marginTop: 10, // Adds spacing after the balance section
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
