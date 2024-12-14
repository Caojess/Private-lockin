import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { CompetitionContext } from "../App";
import { UserContext } from "./UserContext";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "../database/db";

const JoinScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [competitionData, setCompetitionData] = useState(null);
  const { setInCompetition } = useContext(CompetitionContext);
  const { user, updateBalanceInFirestore } = useContext(UserContext);

  const { competitionId } = route.params;

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const docRef = doc(db, "competitionId", competitionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompetitionData({
            ...data,
            spots: parseInt(data.spots), // Ensure spots is a number
          });
        } else {
          console.log("No such competition!");
          Alert.alert("Error", "Competition not found.");
        }
      } catch (error) {
        console.error("Error fetching competition data:", error);
        Alert.alert("Error", "Failed to load competition data.");
      }
    };

    fetchCompetitionData();
  }, [competitionId]);

  const handleJoin = async () => {
    if (!competitionData) return;

    if (competitionData.spots <= 0) {
      Alert.alert("No Spots Left", "Sorry, this competition is full.");
      return;
    }

    const entryFee = parseFloat(competitionData.entryFee);
    console.log(`Entry fee: ${entryFee}`);
    console.log(`Current balance: ${user.fakeMoney}`);

    if (user.fakeMoney < entryFee) {
      Alert.alert(
        "Insufficient Funds",
        "You don't have enough balance to join this competition."
      );
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        // Perform all reads first
        const userRef = doc(db, "users", user.userId);
        const userDoc = await transaction.get(userRef);
        const compRef = doc(db, "competitionId", competitionId);
        const compDoc = await transaction.get(compRef);

        const currentBalance = userDoc.data().fakeMoney;
        console.log(`Current balance from Firestore: ${currentBalance}`);

        // Now perform all writes
        const newBalance = currentBalance - entryFee;
        console.log(`New balance after deduction: ${newBalance}`);

        transaction.update(userRef, { fakeMoney: newBalance });

        const updatedCompetitors = [
          ...compDoc.data().competitors,
          user.username,
        ];
        transaction.update(compRef, {
          competitors: updatedCompetitors,
          spots: (parseInt(compDoc.data().spots) - 1).toString(),
        });
      });

      // Update local state
      const updatedBalance = user.fakeMoney - entryFee;
      await updateBalanceInFirestore(user.userId, updatedBalance);
      console.log(`Updated balance in local state: ${updatedBalance}`);

      setInCompetition(true);
      Alert.alert("Success", "You have successfully joined the competition!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Progress", { screen: "CurrentGame" }),
        },
      ]);
    } catch (error) {
      console.error("Error joining competition:", error);
      Alert.alert("Error", "Failed to join competition. Please try again.");
    }
  };

  if (!competitionData) return <Text>Loading...</Text>;

  const potTotal =
    parseFloat(competitionData.entryFee) *
    (competitionData.competitors.length + 1);
  const payout = potTotal / (competitionData.competitors.length + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're Ready To Join!</Text>

      <View style={styles.payoutContainer}>
        <View style={styles.payoutBox}>
          <Text style={styles.payoutLabel}>Pot Total</Text>
          <Text style={styles.payoutValue}>${potTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.payoutBox}>
          <Text style={styles.payoutLabel}>Your Payout Now</Text>
          <Text style={styles.payoutValue}>${payout.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.rulesText}>
        Stay under {competitionData.screenLimit} hours a day for{" "}
        {competitionData.duration} days
      </Text>
      <Text style={styles.warningText}>
        or LOSE YOUR ${competitionData.entryFee}
      </Text>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>
          You currently have ${user.fakeMoney.toFixed(2)} in your account
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.joinButton,
          competitionData.spots <= 0 && styles.disabledButton,
        ]}
        onPress={() =>
          competitionData.spots > 0 ? setModalVisible(true) : null
        }
        disabled={competitionData.spots <= 0}
      >
        <Text style={styles.joinButtonText}>
          {competitionData.spots > 0
            ? `Join for $${competitionData.entryFee}`
            : "No spots left"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to join this {competitionData.duration}-day
              competition for ${competitionData.entryFee}?{"\n\n"}
              Spots left: {competitionData.spots}
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
                onPress={() => {
                  setModalVisible(false);
                  handleJoin();
                }}
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DD3A3A",
    textAlign: "center",
    marginBottom: 24,
  },
  payoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
    borderRadius: 12,
    backgroundColor: "#EE9B9B",
    height: "25%",
    alignContent: "center",
    alignSelf: "center",
  },
  payoutBox: {
    backgroundColor: "#EE9B9B",
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 16,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  payoutLabel: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    color: "#fff",
    marginBottom: 8,
  },
  payoutValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  rulesText: {
    paddingTop: 30,
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "600",
  },
  warningText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#DD3A3A",
    textAlign: "center",
    marginBottom: 16,
  },
  balanceBox: {
    backgroundColor: "#f0f0f0", // Light gray color
    borderRadius: 12,
    marginHorizontal: 8,
    marginTop: 60,
    paddingVertical: 4, // Reduced vertical padding
    paddingHorizontal: 16, // Keep horizontal padding
    alignItems: "center",
    justifyContent: "center", // Ensure text is vertically centered
    alignSelf: "center",
    height: 40, // Set a fixed height that is smaller but enough for text
  },
  disabledButton: {
    backgroundColor: "#888", // Gray color for disabled state
  },
  balanceText: {
    fontSize: 16, // Reduce font size to fit in smaller box
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  joinButton: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
  joinButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
  },
  modalButtonConfirm: {
    backgroundColor: "#DD3A3A",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JoinScreen;
