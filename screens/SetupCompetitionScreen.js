import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

const SetupCompetitionScreen = ({ navigation }) => {
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [duration, setDuration] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [amount, setAmount] = useState('');

  const options = {
    goal: ['<30 min', '<1 hr', '<2 hr', '<3 hr', 'Custom'],
    duration: ['1 day', '2 days', '3 days', '1 week', 'Custom'],
    privacy: ['Public', 'Friends Only', 'Private'],
    amount: ['$0', '$2', '$5', '$10', 'Custom'],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Set up your competition</Text>

      {/* Set Goal */}
      <Text style={styles.sectionHeader}>Set Goal (time per day)</Text>
      <View style={styles.optionsContainer}>
        {options.goal.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              goal === item && styles.selectedButton,
            ]}
            onPress={() => setGoal(item)}
          >
            <Text
              style={[
                styles.optionText,
                goal === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {goal === 'Custom' && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom goal"
            value={customGoal}
            onChangeText={setCustomGoal}
          />
        )}
      </View>

      {/* Set Duration */}
      <Text style={styles.sectionHeader}>Set Duration</Text>
      <View style={styles.optionsContainer}>
        {options.duration.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              duration === item && styles.selectedButton,
            ]}
            onPress={() => setDuration(item)}
          >
            <Text
              style={[
                styles.optionText,
                duration === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {duration === 'Custom' && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom duration"
            value={customDuration}
            onChangeText={setCustomDuration}
          />
        )}
      </View>

      {/* Privacy Setting */}
      <Text style={styles.sectionHeader}>Privacy Setting</Text>
      <View style={styles.optionsContainer}>
        {options.privacy.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              privacy === item && styles.selectedButton,
            ]}
            onPress={() => setPrivacy(item)}
          >
            <Text
              style={[
                styles.optionText,
                privacy === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Set Amount */}
      <Text style={styles.sectionHeader}>Set Amount</Text>
      <View style={styles.optionsContainer}>
        {options.amount.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.optionButton,
              amount === item && styles.selectedButton,
            ]}
            onPress={() => setAmount(item)}
          >
            <Text
              style={[
                styles.optionText,
                amount === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {amount === 'Custom' && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom amount"
            value={customAmount}
            onChangeText={setCustomAmount}
            keyboardType="numeric"
          />
        )}
      </View>

      <TouchableOpacity
  style={styles.continueButton}
  onPress={() => navigation.navigate('InviteFriends')}
>
  <Text style={styles.continueButtonText}>CONTINUE</Text>
</TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#DD3A3A',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 12,
    color: '#000',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#DD3A3A',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  optionText: {
    color: '#DD3A3A',
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: '#DD3A3A',
  },
  selectedText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DD3A3A',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 16,
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#DD3A3A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetupCompetitionScreen;
