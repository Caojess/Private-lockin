import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";

const InviteFriendsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsList, setFriendsList] = useState([
    {
      id: "1",
      name: "Bill",
      invited: false,
      avatar: Image.resolveAssetSource(require("../images/bill.png")).uri,
    },
    {
      id: "2",
      name: "Amanda",
      invited: false,
      avatar: Image.resolveAssetSource(require("../images/amanda.png")).uri,
    },
    {
      id: "3",
      name: "Michelle",
      invited: false,
      avatar: Image.resolveAssetSource(require("../images/PNG image.png")).uri,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleInviteToggle = (id) => {
    setFriendsList((prevList) =>
      prevList.map((friend) =>
        friend.id === id ? { ...friend, invited: !friend.invited } : friend
      )
    );
  };

  const filteredFriends = friendsList.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type username or number"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Friends List */}
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.friendName}>{item.name}</Text>
            <TouchableOpacity
              style={[
                styles.inviteButton,
                item.invited ? styles.invitedButton : styles.inviteButton,
              ]}
              onPress={() => handleInviteToggle(item.id)}
            >
              <Text
                style={[
                  styles.inviteButtonText,
                  item.invited && styles.invitedButtonText,
                ]}
              >
                {item.invited ? "Invited" : "Invite"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setModalVisible(true)} // Show the confirmation modal
      >
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Close modal on hardware back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you ready to create this competition?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)} // Close the modal
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.noButton]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("ShareInvite"); // Navigate to the Share Invite screen
                }}
              >
                <Text style={[styles.modalButtonText, styles.noButtonText]}>
                  Yes
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
    backgroundColor: "#fff",
    padding: 16,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#F9F9F9", // Matching background color with Add Friends screen
    borderRadius: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginLeft: 15,
  },
  friendName: {
    fontSize: 18, // Adjusted text size to match Add Friends screen
    fontWeight: '600', // Matching weight from Add Friends
    flex: 1,
  },
  inviteButton: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 15,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
  },
  invitedButton: {
    backgroundColor: "#B0B0B0", // Gray background when invited
  },
  invitedButtonText: {
    color: "#fff",
  },
  nextButton: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#FCE9E9",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  noButton: {
    backgroundColor: "#DD3A3A",
  },
  noButtonText: {
    color: "#fff",
  },
});

export default InviteFriendsScreen;
