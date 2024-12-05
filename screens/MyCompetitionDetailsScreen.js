import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { CompetitionContext } from "../App"; // Import the context

const MyCompetitionDetailsScreen = ({ navigation, route }) => {
  const { competition } = route.params; // Receive competition details
  const [accepted, setAccepted] = useState([
    { id: 1, name: "Julia", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Harper", image: "https://via.placeholder.com/50" },
  ]);
  const [pending, setPending] = useState([
    { id: 3, name: "Mia", image: "https://via.placeholder.com/50" },
    { id: 4, name: "Maximus", image: "https://via.placeholder.com/50" },
  ]);
  const [requests, setRequests] = useState([
    { id: 5, name: "Papa", image: "https://via.placeholder.com/50" },
    { id: 6, name: "Luna", image: "https://via.placeholder.com/50" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const { setInCompetition } = useContext(CompetitionContext); // Access the global state

  const handleApprove = (user) => {
    setAccepted((prev) => [...prev, user]); // Add to accepted
    setRequests((prev) => prev.filter((req) => req.id !== user.id)); // Remove from requests
  };

  const handleDecline = (user) => {
    setRequests((prev) => prev.filter((req) => req.id !== user.id)); // Remove from requests
  };

  const handleStartCompetition = () => {
    setModalVisible(false);
    setInCompetition(true); // Update the global competition state
    navigation.navigate("Progress", {
      screen: "CurrentGame", // Navigate to CurrentGame
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Accepted</Text>
      {accepted.map((user) => (
        <View key={user.id} style={styles.userRow}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Pending</Text>
      {pending.map((user) => (
        <View key={user.id} style={styles.userRow}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.pendingText}>Invited</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Approve?</Text>
      {requests.map((user) => (
        <View key={user.id} style={styles.userRow}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleApprove(user)}
          >
            <Text style={styles.approveText}>✔</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => handleDecline(user)}
          >
            <Text style={styles.declineText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => setModalVisible(true)} // Show confirmation modal
      >
        <Text style={styles.startButtonText}>Start Competition</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to join this {competition.time} competition
              for $15?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)} // Close modal
              >
                <Text style={styles.modalButtonTextCancel}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={handleStartCompetition}
              >
                <Text style={styles.modalButtonTextConfirm}>Yes!</Text>
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
    backgroundColor: "#fff",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#DD3A3A",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  pendingText: {
    color: "#777",
  },
  approveButton: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  declineButton: {
    backgroundColor: "#FCE9E9",
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  approveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  declineText: {
    color: "#DD3A3A",
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 16,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonCancel: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  modalButtonConfirm: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  modalButtonTextCancel: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalButtonTextConfirm: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MyCompetitionDetailsScreen;
