import React, { createContext, useState, useEffect } from "react";
import { doc, updateDoc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "../database/db";
import { auth } from "../database/db"; // Assuming you have auth initialized in the same file as db
import { onAuthStateChanged } from "firebase/auth";

// Create the context
export const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = await fetchUserData(firebaseUser.uid);
        setUser(userData);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return { userId, ...userDoc.data() };
      } else {
        console.error("No user document found for ID:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  // Function to update fakeMoney specifically
  const updateFakeMoney = (amount) => {
    setUser((prevUser) => ({
      ...prevUser,
      fakeMoney: prevUser.fakeMoney + amount,
    }));
  };

  // Function to update user data
  const updateUser = async (userData) => {
    if (!user || !user.userId) return;

    try {
      await updateDoc(doc(db, "users", user.userId), userData);
      setUser((prevUser) => ({
        ...prevUser,
        ...userData,
      }));
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Function to clear user data (for logout)
  const clearUser = () => {
    setUser(null);
  };

  const updateBalanceInFirestore = async (userId, amount) => {
    const userRef = doc(db, "users", userId);
    try {
      const newBalance = await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("User document does not exist!");
        }
        const currentBalance = userDoc.data().fakeMoney || 0;
        const updatedBalance = currentBalance + amount;

        if (updatedBalance < 0) {
          throw new Error("Insufficient funds");
        }

        transaction.update(userRef, { fakeMoney: updatedBalance });
        return updatedBalance;
      });

      // Update local state
      setUser((prevUser) => ({
        ...prevUser,
        fakeMoney: newBalance,
      }));

      return newBalance; // Return the new balance
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        updateFakeMoney,
        updateBalanceInFirestore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
