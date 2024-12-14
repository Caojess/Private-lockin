import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { db, auth } from "../database/db"; // Ensure Firebase auth and db are imported
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const SetupCompetitionScreen = ({ navigation }) => {
  const [goal, setGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [username, setUsername] = useState(""); // To store the current user's username

  const options = {
    goal: ["<30 min", "<1 hr", "<2 hr", "<3 hr", "Custom"],
    duration: ["1 day", "2 days", "3 days", "1 week", "Custom"],
    privacy: ["Public", "Friends"],
    amount: ["$0", "$2", "$5", "$10", "Custom"],
  };

  // Fetch the current user's username
  useEffect(() => {
    const fetchUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const email = userDoc.data().email;
            const extractedUsername = email.split("@")[0]; // Extract part before '@'
            setUsername(extractedUsername);
          } else {
            console.error("User document not found!");
          }
        } else {
          console.error("No user logged in!");
        }
      });
    };
    fetchUser();
  }, []);

  const createCompetition = async () => {
    // Validate the inputs
    const finalGoal = goal === "Custom" ? customGoal : goal;
    const finalDuration =
      duration === "Custom" ? customDuration : duration.replace(/\D/g, ""); // Extract duration in days
    const finalAmount = amount === "Custom" ? customAmount : amount.replace("$", "");

    if (!finalGoal || !finalDuration || !privacy || !finalAmount) {
      Alert.alert("Error", "Please fill in all the required fields.");
      return;
    }

    try {
      // Create a new competition object
      const newCompetition = {
        name: `${username}'s Competition`, // Dynamically generate the name
        image: "images/default-competition.png", // Default image
        competitors: [],
        screenLimit: parseInt(finalGoal.replace(/\D/g, ""), 10) || 0, // Extract numbers from the goal
        duration: parseInt(finalDuration, 10),
        entryFee: finalAmount,
        spots: "4", // Default number of spots (adjust as needed)
        type: privacy.toLowerCase(), // "public" or "friends"
      };

      // Add the competition to Firestore
      const docRef = await addDoc(collection(db, "competitionId"), newCompetition);

      console.log("Competition added with ID: ", docRef.id);

      // Navigate back to the HomeScreen
      navigation.navigate("Home", { newCompetition: { id: docRef.id, ...newCompetition } });
    } catch (error) {
      console.error("Error creating competition: ", error);
      Alert.alert("Error", "Failed to create competition. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Set Goal */}
      <Text style={styles.sectionHeader}>Select Daily Screen Time Goal</Text>
      <View style={styles.optionsContainer}>
        {options.goal.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              goal === item && styles.selectedButton,
            ]}
            onPress={() => setGoal(item)}
          >
            <Text
              style={[
                styles.optionText,
                goal === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {goal === "Custom" && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom goal"
            value={customGoal}
            onChangeText={setCustomGoal}
          />
        )}
      </View>

      {/* Set Duration */}
      <Text style={styles.sectionHeader}>Select Duration</Text>
      <View style={styles.optionsContainer}>
        {options.duration.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              duration === item && styles.selectedButton,
            ]}
            onPress={() => setDuration(item)}
          >
            <Text
              style={[
                styles.optionText,
                duration === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {duration === "Custom" && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom duration (in days)"
            value={customDuration}
            onChangeText={setCustomDuration}
            keyboardType="numeric"
          />
        )}
      </View>

      {/* Privacy Setting */}
      <Text style={styles.sectionHeader}>Select Privacy Setting</Text>
      <View style={styles.optionsContainer}>
        {options.privacy.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              privacy === item && styles.selectedButton,
            ]}
            onPress={() => setPrivacy(item)}
          >
            <Text
              style={[
                styles.optionText,
                privacy === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Set Amount */}
      <Text style={styles.sectionHeader}>Select Stake Amount</Text>
      <View style={styles.optionsContainer}>
        {options.amount.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              amount === item && styles.selectedButton,
            ]}
            onPress={() => setAmount(item)}
          >
            <Text
              style={[
                styles.optionText,
                amount === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {amount === "Custom" && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom amount"
            value={customAmount}
            onChangeText={setCustomAmount}
            keyboardType="numeric"
          />
        )}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={createCompetition}
      >
        <Text style={styles.continueButtonText}>CREATE COMPETITION</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginVertical: 12,
    color: "#000",
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#DD3A3A",
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    width: "100%",
  },
  optionText: {
    color: "#DD3A3A",
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "#DD3A3A",
  },
  selectedText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DD3A3A",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 16,
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "60%",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SetupCompetitionScreen;
