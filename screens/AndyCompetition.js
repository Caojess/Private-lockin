import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ProgressBarAndroid } from 'react-native';

const participants = [
  {
    id: '1',
    name: 'Andy',
    image: require('../images/andy.png'),
    timeElapsed: '00:45',
    totalTime: '3:00',
    progress: 0.25, // Progress in percentage (e.g., 0.25 = 25%)
  },
  {
    id: '2',
    name: 'Mia',
    image: require('../images/Mia.png'),
    timeElapsed: '00:45',
    totalTime: '3:00',
    progress: 0.25,
  },
];

const AndyCompetition = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Andy’s competition</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      {/* Competition Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.dayInfo}>Day 3/5</Text>
        <Text style={styles.potInfo}>Current Pot: $40</Text>
      </View>

      {/* Participants */}
      {participants.map((participant) => (
        <View key={participant.id} style={styles.participantCard}>
          <Image source={participant.image} style={styles.avatar} />
          <View style={styles.progressContainer}>
            <Text style={styles.participantName}>{participant.name}</Text>
            <View style={styles.progressBarWrapper}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={participant.progress}
                color="#D9534F"
                style={styles.progressBar}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeElapsed}>{participant.timeElapsed}</Text>
              <Text style={styles.totalTime}>{participant.totalTime}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Progress</Text>
        <Text style={styles.navItem}>Friends</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
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
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dayInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D9534F',
    marginBottom: 4,
  },
  potInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D9534F',
  },
  participantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBarWrapper: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBar: {
    height: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeElapsed: {
    fontSize: 14,
    color: '#000',
  },
  totalTime: {
    fontSize: 14,
    color: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 20,
  },
  navItem: {
    fontSize: 14,
    color: '#000',
  },
});

export default AndyCompetition;
