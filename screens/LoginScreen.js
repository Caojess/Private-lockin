import React, { useState, useEffect } from "react";
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
import { auth } from "../database/db"; // Import Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";
LogBox.ignoreLogs(["Warning: ..."]); // Suppress warnings for clean logs

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalType, setModalType] = useState(false); // 'screenTime' or 'gamblingWarning'

  useEffect(() => {
    // Clear email and password when the screen is focused (the login error too)
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail("");
      setPassword("");
    });

    return unsubscribe; // Clean up the listener
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Show the screenTime modal on successful login
      setModalType("screenTime");
    } catch (error) {
      let errorMessage = "Login Failed. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        default:
          errorMessage = "An unexpected error occurred. Please try again.";
          break;
      }

      Alert.alert("Login Error", errorMessage);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleAllowScreenTime = () => {
    setModalType("gamblingWarning"); // Show the gambling warning modal
  };

  const handleAgreeToGamblingWarning = () => {
    setModalType(null); // Close modal
    navigation.navigate("Welcome"); // Navigate to the Welcome screen
  };

  const handleDisagree = () => {
    setModalType(null); // Close modal
    navigation.navigate("Home"); // Navigate to the Home screen
  };

  return (
    <View style={styles.container}>
      {/* Lock Icon */}
      <Image
        source={require("../images/Lock Orientation.png")}
        style={styles.lockIcon}
      />
      <Text style={styles.title}>WELCOME TO</Text>
      <Text style={styles.appName}>LOCKIN</Text>

      {/* Username and Password Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      <Modal visible={!!modalType} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalType === "screenTime" && (
              <>
                <Text style={styles.modalText}>
                  Allow LockIn to Access your Screen Time Data?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setModalType(null)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Don't Allow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAllowScreenTime}
                    style={[styles.modalButton, styles.allowButton]}
                  >
                    <Text
                      style={[styles.modalButtonText, styles.allowButtonText]}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {modalType === "gamblingWarning" && (
              <>
                <Text style={styles.gamblingWarningTitle}>
                  WARNING: Participate Responsibly
                </Text>
                <Text style={styles.modalText}>
                  Only stake what you can afford to lose. Focus on healthy
                  habits, not just winning. Understand the risks: gambling-like
                  stakes can cause stress and financial strain.
                  {"\n\n"}Need help? Call 1-800-522-4700 for support from the
                  National Problem Gambling Helpline.
                  {"\n\n"}Press “I agree” to acknowledge this message and to use
                  LOCKIN responsibly.
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
                    <Text
                      style={[styles.modalButtonText, styles.allowButtonText]}
                    >
                      I agree
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
