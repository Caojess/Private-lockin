import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext, UserProvider } from "./UserContext";

const WelcomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>WELCOME,</Text>
      <Text style={styles.userName}>{user.username || "User"} </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("MainTabs")} // Replaces the stack to go to the main app
      >
        <Text style={styles.buttonText}>Join Competition</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.createButton]}
        onPress={() => {
          navigation.navigate("SetupCompetition");
        }} // Navigate to SetupCompetitionScreen
      >
        <Text style={[styles.buttonText, styles.createButtonText]}>
          Create Custom
        </Text>
      </TouchableOpacity>
      <Text style={styles.moneyText}>
        We've added $100 to your account, enjoy!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  userName: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#DD3A3A",
    marginBottom: 40,
  },
  moneyText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DD3A3A",
  },
  createButtonText: {
    color: "#DD3A3A",
  },
});

export default WelcomeScreen;
