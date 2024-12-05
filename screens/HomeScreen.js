import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import FriendsScroll from '../components/FriendsScroll';
import PublicScroll from '../components/PublicScroll';

//username
//password
const HomeScreen = ({ navigation, route }) => {
  const [myCompetitions, setMyCompetitions] = useState([]);
  const mockCompetitions = [
    { id: 1, name: "Andy's $15 Competition", time: '3 Hours / 1 Day', spots: '1/4 Spots Left' },
    { id: 2, name: "Ingrid's $20 Competition", time: '5 Hours / 2 Days', spots: '2/5 Spots Left' },
  ];

  // Check if a new competition is passed from ShareInviteScreen
  React.useEffect(() => {
    if (route.params?.newCompetition) {
      setMyCompetitions((prev) => [route.params.newCompetition, ...prev]);
    }
  }, [route.params?.newCompetition]);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
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
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('MyCompetitionDetails', { competition })}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FriendsScroll competitions={mockCompetitions} />

      <Text style={styles.sectionTitle}>Local & Public</Text>
      <PublicScroll competitions={mockCompetitions} />

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
  viewButton: {
    backgroundColor: '#DD3A3A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  createCustomButton: {
    marginTop: 20,
    backgroundColor: '#D9534F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 90,
  },
  createCustomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
