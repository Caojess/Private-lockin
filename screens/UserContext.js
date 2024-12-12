import React, { createContext, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../database/db";

// Create the context
export const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    username: "",
    email: "",
    fakeMoney: 0,
    screenTime: 0,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to update user data
  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  // Function to clear user data (for logout)
  const clearUser = () => {
    setUser({
      userId: null,
      username: "",
      email: "",
      fakeMoney: 0,
      screenTime: 0,
    });
    setIsLoggedIn(false);
  };

  // Function to update fakeMoney specifically
  const updateFakeMoney = (amount) => {
    setUser((prevUser) => ({
      ...prevUser,
      fakeMoney: prevUser.fakeMoney + amount,
    }));
  };

  const updateBalanceInFirestore = async (userId, amount) => {
    try {
      const userRef = doc(db, "users", userId);

      // First, get the current balance
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const currentBalance = userSnap.data().fakeMoney || 0;
        const newBalance = currentBalance + amount;

        // Update Firestore
        await updateDoc(userRef, {
          fakeMoney: newBalance,
        });

        // Update local state
        setUser((prevUser) => ({
          ...prevUser,
          fakeMoney: newBalance,
        }));

        console.log("Balance updated successfully");
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        // updateFakeMoney, // Provide updateFakeMoney
        updateBalanceInFirestore,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
