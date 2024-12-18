import React, { useState, useContext, useEffect } from "react";
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
import { UserContext } from "./UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/db";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const { user, updateUser, updateBalanceInFirestore } =
    useContext(UserContext);

  useEffect(() => {
    const fetchLatestBalance = async () => {
      if (!user || !user.userId) {
        console.log("No user data available");
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", user.userId));
        if (userDoc.exists()) {
          const latestFakeMoney = userDoc.data().fakeMoney;
          updateUser({ fakeMoney: latestFakeMoney });
        }
      } catch (error) {
        console.error("Error fetching latest balance:", error);
      }
    };

    fetchLatestBalance();
  }, [user?.userId, updateUser]);

  const chartData = {
    "This Week": {
      general: [1.2, 2.1, 2.8, 3.5, 2.4, 3.3, 2.7], // Scaled values between 1 and 4
      tiktok: [1.5, 2, 2.5, 3, 2.8, 3.3, 3.5],
      messages: [1.5, 2, 2.5, 3, 2.8, 3.3, 3.5],
      instagram: [2, 2.5, 3, 3.2, 3.5, 3.8, 4],
      labels: ["M", "T", "W", "T", "F", "Sa", "Su"],
    },
    "This Month": {
      general: [1.8, 2.7, 3.3, 3.8], // Scaled values
      tiktok: [2, 2.5, 3, 3.5],
      messages: [2, 2.6, 3, 3.5],
      instagram: [2, 2.5, 3.1, 3.5],
      labels: ["W1", "W2", "W3", "W4"],
    },
    "Past 6 Months": {
      general: [1.9, 2.4, 2.8, 3.1, 3.5, 3.9], // Scaled values
      tiktok: [1.5, 1.8, 2.3, 2.8, 3.2, 3.8],
      messages: [1.2, 1.6, 2.1, 2.5, 3, 3.5],
      instagram: [2, 2.5, 3, 3.5, 3.8, 4],
      labels: ["Jul", "Au", "Se", "Oc", "No", "De"],
    },
    "Past Year": {
      general: [1.5, 2, 2.8, 3.2, 3.4, 3.6, 3.8, 3.9, 3.5, 3, 2.7, 2.3], // Scaled values
      tiktok: [1.5, 2, 2.5, 3, 3.2, 3.5, 3.7, 3.8, 3.9, 3.5, 3, 2.5],
      messages: [1.2, 1.5, 2, 2.3, 2.8, 3, 3.3, 3.5, 3.7, 3.5, 3.2, 3],
      instagram: [1.5, 2, 2.5, 3, 3.2, 3.5, 3.7, 3.8, 3.9, 3.5, 3, 2.5],
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBalance, setNewBalance] = useState(""); // Track input for new balance

  const handleBalanceUpdate = async () => {
    if (newBalance && !isNaN(newBalance)) {
      const amountToAdd = parseFloat(newBalance);
      try {
        const updatedBalance = await updateBalanceInFirestore(
          user.userId,
          amountToAdd
        );
        console.log(
          `Balance updated successfully. New balance: ${updatedBalance}`
        );
        setIsModalVisible(false); // Close the modal
        setNewBalance(""); // Clear input
      } catch (error) {
        console.error("Error adding funds:", error);
        Alert.alert("Error", "Failed to add funds. Please try again.");
      }
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number.");
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
            source={require("../images/you.png")}
            style={styles.profileImage}
          />
          <Text style={styles.title}>{user.username}</Text>
        </View>

        {/* Balance Section */}
        <View>
          <View style={styles.balanceContainer}>
            <View style={styles.lockInBucksContainer}>
              <Text style={styles.sectionTitle}>
                LockIn Bucks:{" "}
                <Text style={styles.sectionText}>${user.fakeMoney}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Text style={styles.addButtonText}>Add Funds</Text>
            </TouchableOpacity>
          </View>

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
              minValue={1}
              maxValue={4}
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        </View>

        {/* TikTok Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>
            You spent an average of {formatAverage(data.tiktok)} per day on
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
              minValue={1}
              maxValue={4}
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
              minValue={1}
              maxValue={4}
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
              minValue={1}
              maxValue={4}
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  yAxisInterval: 1, // Increment y-axis by 1 unit
  decimalPlaces: 0, // Display whole numbers only
  color: (opacity = 1) => `rgba(221, 58, 58, ${opacity})`, // Bar color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "flex-start",
  },
  lockInBucksContainer: {
    backgroundColor: "#FCE9E9", // Light pink background for LockIn Bucks
    padding: 10,
    borderRadius: 5,
    borderRadius: 5,
    alignSelf: "center", // Ensure alignment relative to parent container
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: "#DD3A3A",
    padding: 10,
    borderRadius: 5,
    marginLeft: -30, // Move left slightly
    marginTop: 0, // Move higher slightly
    alignSelf: "center", // Ensure alignment relative to parent container
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
  balanceContainer: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space between balance and button
    marginBottom: 10, // Add spacing below
  },
});
