import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const mockFriendsToAdd = [
  { id: '1', name: 'Autumn', image: require('../images/Autumn.png') },
  { id: '2', name: 'Bridgerton', image: require('../images/Bridgerton.png') },
  { id: '3', name: 'Coy', image: require('../images/Coy.png') },
  { id: '4', name: 'Maximilian', image: require('../images/Maximilian.png') },
  { id: '5', name: 'Maximilius', image: require('../images/Maximilius.png') },
  { id: '6', name: 'Reginor', image: require('../images/Reginor.png') },
  { id: '7', name: 'Salvadore', image: require('../images/Salvadore.png') },
  { id: '8', name: 'Xinyi', image: require('../images/Xinyi.png') },
];

const AddFriends = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(mockFriendsToAdd);
  const [addedFriends, setAddedFriends] = useState(new Set()); // To track added friends

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredFriends(mockFriendsToAdd);
    } else {
      setFilteredFriends(
        mockFriendsToAdd.filter((friend) =>
          friend.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const handleAddFriend = (friend) => {
    // Toggle the added status of the friend
    setAddedFriends((prevAddedFriends) => {
      const newAddedFriends = new Set(prevAddedFriends);
      if (newAddedFriends.has(friend.id)) {
        newAddedFriends.delete(friend.id); // Remove if already added
      } else {
        newAddedFriends.add(friend.id); // Add if not added
      }
      return newAddedFriends;
    });
  };

  // Set the back button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Type username or number"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <Text style={styles.suggestedText}>Suggested</Text>
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <Image source={item.image} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
            <TouchableOpacity
              style={[
                styles.addButton,
                addedFriends.has(item.id) && styles.addedButton, // Apply added style if the friend is added
              ]}
              onPress={() => handleAddFriend(item)}
            >
              <Text style={styles.addButtonText}>
                {addedFriends.has(item.id) ? 'Requested' : 'Send request'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  suggestedText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12, // Space between "Suggested" and the friend list
    paddingLeft: 16,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center', // Align items to the center vertically
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 20,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1, // Take remaining space so the name doesn't overlap the button
  },
  addButton: {
    backgroundColor: '#DD3A3A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addedButton: {
    backgroundColor: '#B0B0B0', // Gray background when added !!!!!!!!!!!!!
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 18,
    color: '#000',
  },
});

export default AddFriends;
