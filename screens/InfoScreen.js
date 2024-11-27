import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Learn More About LockIn</Text>

      {/* Website Link */}
      <TouchableOpacity onPress={() => Linking.openURL('https://web.stanford.edu/class/cs147/projects/Design-for-Healthy-Behaviors/Lockin/')}>
        <Text style={styles.link}>Visit Our Website</Text>
      </TouchableOpacity>

      {/* Sections */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Joining Competitions</Text>
          <Text style={styles.sectionContent}>
            Joining a competition is easy! Simply find a competition that matches your interests and buy in with the displayed amount. 
            Once you're in, the game is on! Stick to the screen time limits to stay in the competition.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Competitions Operate</Text>
          <Text style={styles.sectionContent}>
            Each competition has rules to help you focus on healthy behaviors. You'll see daily time limits and a set timeline for each 
            competition. The goal is to stay within the limits to keep your buy-in secure and potentially win the pot.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Understanding the Pot</Text>
          <Text style={styles.sectionContent}>
            The pot is the total amount contributed by all participants. If you meet your goals and others don't, you have a chance to
            claim a portion of the pot. Everyone wins by sticking to healthy screen time habits!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Stakes Work</Text>
          <Text style={styles.sectionContent}>
            Each competition comes with stakes—your buy-in. If you stick to the competition's rules, you'll keep your buy-in safe and 
            could win part of the pot. If you don't, you risk losing your buy-in to the winners. The stakes motivate you to stay on track!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40, // Leave room for proper spacing
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DD3A3A',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: '#0000EE',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default InfoScreen;
