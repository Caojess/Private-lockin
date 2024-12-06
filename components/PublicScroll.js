import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PublicScroll = () => {
    // Randomized buy-in amounts
  const buyInAmounts = ['$2', '$5', '$20', '$15', '$8'];
 // Define the competitions array directly in this component
 const competitions = [
    {
      id: 1,
      name: "Alexa's Competition",
      time: '<2 hours for 1 day',
      spots: '1 spot left',
      avatar: require('../images/harper.png'),
    },
    {
      id: 2,
      name: "Leah's Competition",
      time: '<3.5 hours for 1 day',
      spots: '6 spots left',
      avatar: require('../images/you.png'),
    },
    {
      id: 3,
      name: "Jon's Competition",
      time: '<4 hours for 2 days',
      spots: '3 spots left',
      avatar: require('../images/andy.png'),
    },
    {
      id: 4,
      name: "Amy's Competition",
      time: '<5.5 hours for 1 day',
      spots: '1 spot left',
      avatar: require('../images/Mia.png'),
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
          <Text style={styles.cardSubTitle}>{competition.buyIn} </Text>
          <Text style={styles.cardDetails}>{competition.time}</Text>
          <Text style={styles.cardDetails}>{competition.spots}</Text>

          {/* View Button */}
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('Compete', {
                competitionName: competition.name,
                competitors: [
                  { id: 1, name: 'Leah', time: '5.5 hours', avatar: require('../images/you.png') },
                  { id: 2, name: 'Alex', time: '5 hours', avatar: require('../images/Mia.png') },
                  { id: 3, name: 'Katie', time: '7 hours', avatar: require('../images/harper.png') },
                  { id: 4, name: 'Jon', time: '5 hours', avatar: require('../images/andy.png') },
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
    paddingHorizontal: 16,
      marginVertical: 8,
    },
    card: {
      width: 200,
      height: 200,
      backgroundColor: '#EE9B9B',
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
      fontSize: 16,
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
      backgroundColor: '#DD3A3A',
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
      color: '#fff',
    },
  });

export default PublicScroll;
