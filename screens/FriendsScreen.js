import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Friend data
const friends = [
  {
    id: "1",
    name: "Bill",
    image: require("../images/bill.png"),
    status: "Competition Status",
    averageScreenTime: "3:28",
    statusColor: "#DD3A3A",
    competitionScreen: "AndyCompetition",
  },
  {
    id: "2",
    name: "Amanda",
    image: require("../images/amanda.png"),
    status: "No Competition",
    averageScreenTime: "5:35",
    statusColor: "#B0B0B0",
    competitionScreen: null,
  },
  {
    id: "3",
    name: "Mia",
    image: require("../images/PNG image.png"),
    status: "Competition Status",
    averageScreenTime: "2:31",
    statusColor: "#DD3A3A",
    competitionScreen: "MiaCompetition",
  },
];

// FriendCard Component
const FriendCard = ({ friend }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (friend.competitionScreen) {
      navigation.navigate(friend.competitionScreen); // Navigate to competition screen
    }
  };

  return (
    <View style={styles.friendCard}>
      <Image source={friend.image} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.averageScreenTime}>
          Average Screen Time{" "}
          <Text style={styles.bold}>{friend.averageScreenTime}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.statusButton, { backgroundColor: friend.statusColor }]}
        onPress={handlePress}
        disabled={!friend.competitionScreen} // Disable button if no competition screen
      >
        <Text style={styles.statusText}>{friend.status}</Text>
      </TouchableOpacity>
    </View>
  );
};

// FriendsScreen Component
const FriendsScreen = () => {
  const navigation = useNavigation(); // Use navigation hook for navigation

  const handleAddFriends = () => {
    navigation.navigate("AddFriends"); // Navigate to the AddFriends screen
  };

  const handleFriendRequests = () => {
    navigation.navigate("FriendRequests"); // Navigate to the FriendRequests screen
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FriendCard friend={item} />}
        contentContainerStyle={styles.friendsList}
      />
      <TouchableOpacity
        style={styles.friendRequestsButton}
        onPress={handleFriendRequests}
      >
        <Text style={styles.friendRequestsText}>Friend Requests</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddFriends}>
        <Text style={styles.addButtonText}>Add Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 50, // Add extra padding to move the content down
    paddingBottom: 50,
  },
  friendsList: {
    paddingBottom: 20,
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  averageScreenTime: {
    fontSize: 14,
    color: "#555",
  },
  bold: {
    fontWeight: "700",
    color: "#DD3A3A",
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  friendRequestsButton: {
    marginTop: 20,
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 90,
  },
  friendRequestsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 90,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FriendsScreen;
