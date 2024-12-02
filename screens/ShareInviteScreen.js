import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const ShareInviteScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Share Invite Text */}
      <Text style={styles.shareText}>Share Invite Link</Text>

      {/* Social Media Icons */}
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50?text=IG' }}
          style={styles.icon}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/50?text=FB' }}
          style={styles.icon}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/50?text=TW' }}
          style={styles.icon}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/50?text=SMS' }}
          style={styles.icon}
        />
      </View>

      {/* Return to Home Button */}
      <TouchableOpacity
  style={styles.returnButton}
  onPress={() =>
    navigation.navigate('Home', {
      newCompetition: {
        id: '9', // Unique ID for the competition
        name: 'My $10 Competition',
        time: '2 Hours / 1 Day',
        spots: '1/6 Spots Left',
      },
    })
  }
>
  <Text style={styles.returnButtonText}>Return to Home</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  shareText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DD3A3A',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 24,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  returnButton: {
    backgroundColor: '#DD3A3A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShareInviteScreen;
