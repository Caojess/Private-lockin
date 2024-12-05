import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock friend request data
const friendRequests = [
  { id: '1', name: 'Emilia', image: require('../images/harper.png') },
  { id: '2', name: 'Lourde', image: require('../images/Mia.png') },
  { id: '3', name: 'Zach', image: require('../images/you.png') },
];

const FriendRequestsScreen = () => {
  const navigation = useNavigation();
  const [requestStatus, setRequestStatus] = useState({}); // Store the status of each request

  const toggleStatus = (id, status) => {
    setRequestStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === status ? null : status, // Toggle between null and the status
    }));
  };

  // Set up the custom back button in the header
  React.useLayoutEffect(() => {
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
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestCard}>
            <Image source={item.image} style={styles.profilePicture} />
            <Text style={styles.requestName}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.uncheckedButton, // Default red border
                  requestStatus[item.id] === 'Accepted' && styles.acceptedButton, // Fill red on Accept
                ]}
                onPress={() => toggleStatus(item.id, 'Accepted')}
              >
                <Text style={styles.actionButtonText}>✔</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.uncheckedButton, // Default red border
                  requestStatus[item.id] === 'Rejected' && styles.rejectedButton, // Fill red on Reject
                ]}
                onPress={() => toggleStatus(item.id, 'Rejected')}
              >
                <Text style={styles.actionButtonText}>✖</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 18,
    color: '#000',
    },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 16,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  requestName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
  },
  uncheckedButton: {
    borderColor: '#DD3A3A', // Red border when unchecked
    backgroundColor: 'transparent', // Transparent background
  },
  acceptedButton: {
    backgroundColor: '#DD3A3A', // Red fill when checked (Accepted)
    borderColor: '#DD3A3A',
  },
  rejectedButton: {
    backgroundColor: '#DD3A3A', // Red fill when checked (Rejected)
    borderColor: '#DD3A3A',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FriendRequestsScreen;
