import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockFriendsToAdd = [
  { id: '1', name: 'Autumn' },
  { id: '2', name: 'Bridgerton' },
  { id: '3', name: 'Coy' },
  { id: '4', name: 'Maximilian' },
  { id: '5', name: 'Maximilius' },
  { id: '6', name: 'Reginor' },
  { id: '7', name: 'Salvadore' },
  { id: '8', name: 'Xinyi' },
];

const AddFriends = () => {
  const navigation = useNavigation(); // Use the hook here
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Friends</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <Text style={styles.suggestedText}>Suggested</Text>
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  helpButton: {
    padding: 8,
  },
  helpIcon: {
    fontSize: 18,
    color: '#000',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 12,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addedButton: {
    backgroundColor: '#B0B0B0', // Gray background when added
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AddFriends;
