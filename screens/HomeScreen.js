import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FriendsScroll from '../components/FriendsScroll';
import PublicScroll from '../components/PublicScroll';

const HomeScreen = () => {
    const mockCompetitions = [
        { id: 1, name: "Andy's $15 Competition", time: "3 Hours / 1 Day", spots: "1/4 Spots Left" },
        { id: 2, name: "Ingrid's $20 Competition", time: "5 Hours / 2 Days", spots: "2/5 Spots Left" },
        { id: 3, name: "Nava's $100 Competition", time: "1 Hour / 7 Days", spots: "2/8 Spots Left" },
        { id: 4, name: "Jeff's $50 Competition", time: "2 Hours / 3 Days", spots: "3/6 Spots Left" },
        { id: 5, name: "Mila's $10 Competition", time: "4 Hours / 1 Day", spots: "4/4 Spots Left" },
        { id: 6, name: "Ethan's $25 Competition", time: "2 Hours / 1 Day", spots: "1/5 Spots Left" },
        { id: 7, name: "Sophia's $15 Competition", time: "6 Hours / 2 Days", spots: "3/8 Spots Left" },
        { id: 8, name: "Olivia's $30 Competition", time: "3 Hours / 1 Day", spots: "5/6 Spots Left" },
      ];
      

  return (
    <View style={styles.container}>
        {/* Header */}
      <Text style={styles.header}>Browse Competitions</Text>

      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FriendsScroll competitions={mockCompetitions.slice(0, 4)} />

      <Text style={styles.sectionTitle}>Local & Public</Text>
      <PublicScroll competitions={mockCompetitions.slice(4, 8)} />

      <TouchableOpacity style={styles.createCustomButton}>
        <Text style={styles.createCustomText}>Create Custom</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#DD3A3A',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensure the header spans the entire width
        paddingTop: 50,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },    
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
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
