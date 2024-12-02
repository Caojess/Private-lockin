import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FriendsScroll from '../components/FriendsScroll';
import PublicScroll from '../components/PublicScroll';

const HomeScreen = ({ navigation, route }) => {
  const [myCompetitions, setMyCompetitions] = useState([]);
  const mockCompetitions = [
    { id: 1, name: "Andy's $15 Competition", time: '3 Hours / 1 Day', spots: '1/4 Spots Left' },
    { id: 2, name: "Ingrid's $20 Competition", time: '5 Hours / 2 Days', spots: '2/5 Spots Left' },
    { id: 3, name: "Nava's $100 Competition", time: '1 Hour / 7 Days', spots: '2/8 Spots Left' },
    { id: 4, name: "Jeff's $50 Competition", time: '2 Hours / 3 Days', spots: '3/6 Spots Left' },
    { id: 5, name: "Mila's $10 Competition", time: '4 Hours / 1 Day', spots: '4/4 Spots Left' },
    { id: 6, name: "Ethan's $25 Competition", time: '2 Hours / 1 Day', spots: '1/5 Spots Left' },
    { id: 7, name: "Sophia's $15 Competition", time: '6 Hours / 2 Days', spots: '3/8 Spots Left' },
    { id: 8, name: "Olivia's $30 Competition", time: '3 Hours / 1 Day', spots: '5/6 Spots Left' },
  ];

  // Check if a new competition is passed from ShareInviteScreen
  React.useEffect(() => {
    if (route.params?.newCompetition) {
      setMyCompetitions((prev) => [route.params.newCompetition, ...prev]);
    }
  }, [route.params?.newCompetition]);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <Text style={styles.header}>Browse Competitions</Text>

      {/* My Competitions */}
      {myCompetitions.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>My Competitions</Text>
          {myCompetitions.map((competition) => (
            <View key={competition.id} style={styles.competitionCard}>
              <Text style={styles.competitionName}>{competition.name}</Text>
              <Text style={styles.competitionDetails}>{competition.time}</Text>
              <Text style={styles.competitionSpots}>{competition.spots}</Text>
            </View>
          ))}
        </>
      )}

      {/* Friends Competitions */}
      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FriendsScroll competitions={mockCompetitions.slice(0, 4)} />

      {/* Local Competitions */}
      <Text style={styles.sectionTitle}>Local & Public</Text>
      <PublicScroll competitions={mockCompetitions.slice(4, 8)} />

      {/* Create Custom Button */}
      <TouchableOpacity
        style={styles.createCustomButton}
        onPress={() => navigation.navigate('SetupCompetition')}
      >
        <Text style={styles.createCustomText}>Create Custom</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    paddingTop: 1,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#DD3A3A',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#DD3A3A',
  },
  competitionCard: {
    backgroundColor: '#FCE9E9',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  competitionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DD3A3A',
  },
  competitionDetails: {
    fontSize: 14,
    color: '#000',
  },
  competitionSpots: {
    fontSize: 12,
    color: '#777',
  },
  createCustomButton: {
    marginTop: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#DD3A3A',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: '50%',
    alignSelf: 'center',
  },
  createCustomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DD3A3A',
  },
});

export default HomeScreen;
