import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FriendsScroll = () => {
    // Randomized buy-in amounts
  const buyInAmounts = ['$6', '$15', '$10', '$15', '$4'];
  // Define the competitions array directly in this component
  const competitions = [
    {
      id: 1,
      name: "Andy's",
      time: '3 hours / 1 day',
      spots: '6/10 Spots Left',
      avatar: require('../images/andy.png'),
    },
    {
      id: 2,
      name: "Mia's",
      time: '4 hours / 1 day',
      spots: '1/5 Spots Left',
      avatar: require('../images/Mia.png'),
    },
    {
      id: 3,
      name: "Harper's",
      time: '6 hours / 2 days',
      spots: '4/8 Spots Left',
      avatar: require('../images/harper.png'),
    },
    {
      id: 4,
      name: 'You',
      time: '5.5 hours',
      spots: '1/5 Spots Left',
      avatar: require('../images/you.png'),
    },
  ];

  // Assign a random buy-in amount for each card
  const competitionsWithBuyIn = competitions.map((competition, index) => ({
    ...competition,
    buyIn: buyInAmounts[index % buyInAmounts.length], // Cycle through the buy-in amounts
  }));
  const navigation = useNavigation();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      {competitionsWithBuyIn.map((competition) => (
        <View key={competition.id} style={styles.card}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={competition.avatar}
              style={styles.profileImage}
              onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
            />
          </View>

          {/* Competition Details */}
          <Text style={styles.cardTitle}>{competition.name}</Text>
          <Text style={styles.cardSubTitle}>{competition.buyIn} competition</Text>
          <Text style={styles.cardDetails}>{competition.time}</Text>
          <Text style={styles.cardDetails}>{competition.spots}</Text>

          {/* View Button */}
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('Compete', {
                competitionName: competition.name,
                competitors: [
                  { id: 1, name: 'Syd', time: '5.5 hours', avatar: require('../images/you.png') },
                  { id: 2, name: 'Andy', time: '5 hours', avatar: require('../images/andy.png') },
                  { id: 3, name: 'Harper', time: '6 hours', avatar: require('../images/harper.png') },
                  { id: 4, name: 'Mia', time: '5 hours', avatar: require('../images/Mia.png') },
                ],
                screenLimit: '3 hours / day',
                timeLimit: 'next 3 days',
              })
            }
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    marginVertical: 5,
    paddingHorizontal: 16,
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: '#DD3A3A',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center', // Center all content horizontally
  },
  avatarContainer: {
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff', // White border around the avatar
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    textAlign: 'center',
  },
  cardSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDetails: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
  },
  viewButton: {
    backgroundColor: '#EE9B9B',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginTop: 12,
    height: 30,
    width: '100',
  },
  viewButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default FriendsScroll;
