import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Friend data
const friends = [
  {
    id: '1',
    name: 'Andy',
    image: require('../images/andy.png'),
    status: 'View competition',
    averageScreenTime: '3:28',
    statusColor: '#D9534F',
    competitionScreen: 'AndyCompetition',
  },
  {
    id: '2',
    name: 'Harper',
    image: require('../images/harper.png'),
    status: 'Not competing',
    averageScreenTime: '5:35',
    statusColor: '#B0B0B0',
    competitionScreen: null,
  },
  {
    id: '3',
    name: 'Mia',
    image: require('../images/Mia.png'),
    status: 'View competition',
    averageScreenTime: '2:31',
    statusColor: '#D9534F',
    competitionScreen: 'MiaCompetition',
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
          Average Screen Time <Text style={styles.bold}>{friend.averageScreenTime}</Text>
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FriendCard friend={item} />}
        contentContainerStyle={styles.friendsList}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add friends</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 40, // Add extra padding to move the content down
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
  },
  friendsList: {
    paddingBottom: 20,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9F9F9',
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
    fontWeight: '600',
    marginBottom: 4,
  },
  averageScreenTime: {
    fontSize: 14,
    color: '#555',
  },
  bold: {
    fontWeight: '700',
    color: '#D9534F',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    marginTop: 30,
    marginBottom: 70,
    backgroundColor: '#D9534F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 50,
    width: 'auto',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FriendsScreen;