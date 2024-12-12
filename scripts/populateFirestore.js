const { db } = require("../database/db"); // Adjust path as needed
const { collection, addDoc } = require("firebase/firestore");

const populateCompetitions = async () => {
  const competitions = [
    {
      name: "Mia's Competition",
      type: "friends",
      entryFee: "20",
      screenLimit: 4,
      duration: 2,
      spots: "2",
      competitors: ["Mia 6", "Harper 5"],
    },
    {
      name: "Alexa's Competition",
      type: "public",
      entryFee: "2",
      screenLimit: 2,
      duration: 1,
      spots: "1",
      competitors: ["Alexa 3", "Leah 4"],
    },
  ];

  try {
    const collectionRef = collection(db, "competitionId");
    for (const comp of competitions) {
      await addDoc(collectionRef, comp);
      console.log(`Added competition: ${comp.name}`);
    }
    console.log("All competitions added successfully!");
  } catch (error) {
    console.error("Error adding competitions:", error);
  }
};

populateCompetitions();
