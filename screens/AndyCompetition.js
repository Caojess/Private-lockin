import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ProgressBarAndroid } from 'react-native';

const participants = [
  {
    id: '1',
    name: 'Andy',
    image: require('../images/andy.png'),
    timeElapsed: '00:03',
    totalTime: '3:00',
    progress: 0.25, // Progress in percentage (e.g., 0.25 = 25%)
  },
  {
    id: '2',
    name: 'Mia',
    image: require('../images/Mia.png'),
    timeElapsed: '00:02',
    totalTime: '3:00',
    progress: 0.25,
  },
];

const AndyCompetition = ({ navigation }) => {
  // Setting the custom back button in the header
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    padding: 8,
    size: 24,
    marginLeft: 16,
  },
  backArrow: {
    fontSize: 24,
    marginLeft: 16,
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
});

export default AndyCompetition;
