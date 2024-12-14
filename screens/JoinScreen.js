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
import { doc, getDoc, runTransaction, onSnapshot } from "firebase/firestore";
import { db } from "../database/db";

const JoinScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [competitionData, setCompetitionData] = useState(null);
  const { setInCompetition, setCurrentCompetitionId } =
    useContext(CompetitionContext);
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
            spots: parseInt(data.spots) || 0,
            competitors: data.competitors || [],
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

  // handling new db population
  const handleJoin = async () => {
    if (!competitionData) {
      Alert.alert("Error", "Competition data not available.");
      return;
    }

    const entryFee = parseFloat(competitionData.entryFee);

    try {
      const result = await runTransaction(db, async (transaction) => {
        // Get the latest competition data
        const compRef = doc(db, "competitionId", competitionId);
        const compDoc = await transaction.get(compRef);

        if (!compDoc.exists()) {
          throw new Error("Competition does not exist!");
        }

        const latestCompData = compDoc.data();
        const availableSpots = parseInt(latestCompData.spots) || 0;
        const currentCompetitors = latestCompData.competitors || [];

        // Check if there are still spots available
        if (availableSpots <= 0) {
          throw new Error("Competition is full");
        }

        // Check user's balance
        const userRef = doc(db, "users", user.userId);
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists()) {
          throw new Error("User document does not exist!");
        }

        const currentBalance = userDoc.data().fakeMoney || 0;
        const newBalance = currentBalance - entryFee;

        if (newBalance < 0) {
          throw new Error("Insufficient funds");
        }

        // Check if user is already in the competition
        if (
          currentCompetitors.some(
            (competitor) => competitor.name === user.username
          )
        ) {
          throw new Error("You have already joined this competition");
        }

        // Update user's balance
        transaction.update(userRef, { fakeMoney: newBalance });

        // Update competition data
        const updatedCompetitors = [
          ...currentCompetitors,
          {
            name: user.username,
            image: user.profileImage || "images/default-pfp.png",
            hours: 0,
            screenTime: 0,
            dropped: false,
          },
        ];

        const newAvailableSpots = availableSpots - 1;

        transaction.update(compRef, {
          competitors: updatedCompetitors,
          spots: newAvailableSpots,
        });

        return { newBalance, updatedCompetitors, spots: newAvailableSpots };
      });

      // Update local state
      setCompetitionData((prevData) => ({
        ...prevData,
        competitors: result.updatedCompetitors,
        spots: result.spots,
      }));

      // Update user's balance in context
      await updateBalanceInFirestore(user.userId, -entryFee);

      // Set competition status
      setInCompetition(true);
      setCurrentCompetitionId(competitionId);

      Alert.alert("Success", "You have successfully joined the competition!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Progress", { competitionId }),
        },
      ]);
    } catch (error) {
      console.error("Error joining competition:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to join competition. Please try again."
      );
    }
  };

  if (!competitionData) return <Text>Loading...</Text>;

  const potTotal =
    parseFloat(competitionData.entryFee) * competitionData.competitors.length;
  const payout =
    competitionData.competitors.length > 0
      ? potTotal / competitionData.competitors.length
      : parseFloat(competitionData.entryFee);

  const potTotalIfJoined = potTotal + parseFloat(competitionData.entryFee);
  const payoutIfJoined =
    potTotalIfJoined / (competitionData.competitors.length + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're Ready To Join!</Text>

      <View style={styles.payoutContainer}>
        <View style={styles.payoutBox}>
          <Text style={styles.payoutLabel}>Current Pot Total</Text>
          <Text style={styles.payoutValue}>${potTotal.toFixed(2)}</Text>
          {competitionData.spots > 0 && (
            <Text style={styles.payoutSubtext}>
              ${potTotalIfJoined.toFixed(2)} if you join
            </Text>
          )}
        </View>
        <View style={styles.payoutBox}>
          <Text style={styles.payoutLabel}>Your Payout Now</Text>
          <Text style={styles.payoutValue}>
            $
            {competitionData.spots > 0
              ? payoutIfJoined.toFixed(2)
              : payout.toFixed(2)}
          </Text>
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
          You currently have ${user.fakeMoney}
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
  payoutSubtext: {
    fontSize: 14,
    color: "red",
    marginTop: 4,
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
