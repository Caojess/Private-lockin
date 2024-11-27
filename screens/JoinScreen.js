import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const JoinScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleJoin = () => {
    setModalVisible(false);
    navigation.navigate('CurrentGame');
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>YOU’RE READY TO JOIN</Text>

      {/* Pot Total and Payout */}
      <View style={styles.payoutContainer}>
        <View style={styles.payoutBox}>
          <Text style={styles.payoutLabel}>Pot Total</Text>
          <Text style={styles.payoutValue}>$60.00</Text>
        </View>
        <View style={styles.payoutBox}>
          <Text style={styles.payoutLabel}>Your Payout Now</Text>
          <Text style={styles.payoutValue}>$15.00</Text>
        </View>
      </View>

      {/* Rules */}
      <Text style={styles.rulesText}>Stay under 3 hours a day for 3 days</Text>
      <Text style={styles.warningText}>or LOSE YOUR $15</Text>

      {/* Current Balance */}
      <Text style={styles.balanceText}>Current account balance: $40</Text>

      {/* Join Button */}
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.joinButtonText}>Join for $15</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to join this 3-day competition for $15?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleJoin}
              >
                <Text style={styles.modalButtonText}>Yes!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  payoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#EE9B9B',
    height: '25%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  payoutBox: {
    backgroundColor: '#EE9B9B',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 16,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  payoutLabel: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    color: '#fff',
    marginBottom: 8,
  },
  payoutValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  rulesText: {
    paddingTop: 30,
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  warningText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#DD3A3A',
    textAlign: 'center',
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 18,
    paddingTop: 80,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  joinButton: {
    backgroundColor: '#DD3A3A',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    width: '50%',
    alignSelf: 'center',
  },
  joinButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  modalButtonConfirm: {
    backgroundColor: '#DD3A3A',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinScreen;
