import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  LogBox,
} from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore warnings for clean logs

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showScreenTimeModal, setShowScreenTimeModal] = useState(false);
  const [showGamblingWarningModal, setShowGamblingWarningModal] =
    useState(false);

  const handleLogin = () => {
    if (username === "username" && password === "password") {
      console.log("Login successful, showing ScreenTime modal");
      setShowScreenTimeModal(true);
    } else {
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  };

  const handleAllowScreenTime = () => {
    console.log("Allow Screen Time clicked");
    setShowScreenTimeModal(false); // Close the first modal
    setTimeout(() => {
      console.log("Showing Gambling Warning modal");
      setShowGamblingWarningModal(true); // Show the second modal
    }, 300); // Delay to ensure smooth transition
  };

  const handleAgreeToGamblingWarning = () => {
    console.log("Agree to Gambling Warning clicked");
    setShowGamblingWarningModal(false); // Close the second modal
    navigation.navigate("Welcome"); // Navigate to Welcome screen
  };

  const handleDisagree = () => {
    console.log("Disagree clicked");
    setShowGamblingWarningModal(false); // Close the modal
    navigation.navigate("Home"); // Navigate to Home screen
  };

  return (
    <View style={styles.container}>
      {/* Lock Icon */}
      <Image
        source={require("../images/Lock Orientation.png")} // Relative path for the lock icon
        style={styles.lockIcon}
      />
      <Text style={styles.title}>WELCOME TO</Text>
      <Text style={styles.appName}>LOCKIN</Text>

      {/* Username and Password Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Screen Time Modal */}
      <Modal
        key={"screenTimeModal"}
        visible={showScreenTimeModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Allow LockIn to Access your Screen Time Data?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowScreenTimeModal(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Don't Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAllowScreenTime}
                style={[styles.modalButton, styles.allowButton]}
              >
                <Text style={[styles.modalButtonText, styles.allowButtonText]}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Gambling Warning Modal key={"GamblingWarningModal"}*/}
      <Modal
        key={"GamblingWarningModal"}
        visible={showGamblingWarningModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.gamblingWarningTitle}>
              WARNING: Participate Responsibly
            </Text>
            <Text style={styles.modalText}>
              Only stake what you can afford to lose. Focus on healthy habits,
              not just winning. Understand the risks: gambling-like stakes can
              cause stress and financial strain.{"\n\n"}Need help? Call
              1-800-522-4700 for support from the National Problem Gambling
              Helpline.{"\n\n"}Press “I agree” to acknowledge this message and
              to use LOCKIN responsibly.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleDisagree}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>I disagree</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAgreeToGamblingWarning}
                style={[styles.modalButton, styles.allowButton]}
              >
                <Text style={[styles.modalButtonText, styles.allowButtonText]}>
                  I agree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  lockIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#DD3A3A",
    marginBottom: 40,
  },
  input: {
    width: "70%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  loginButton: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
    width: "50%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DD3A3A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  signupButtonText: {
    color: "#DD3A3A",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  gamblingWarningTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DD3A3A",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#DD3A3A",
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#DD3A3A",
    fontSize: 14,
    fontWeight: "bold",
  },
  allowButton: {
    backgroundColor: "#DD3A3A",
  },
  allowButtonText: {
    color: "#fff",
  },
});

export default LoginScreen;
