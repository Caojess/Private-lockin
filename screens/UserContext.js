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

  const updateBalanceInFirestore = async (userId, newBalance) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { fakeMoney: newBalance });

      // Update local state
      setUser((prevUser) => ({
        ...prevUser,
        fakeMoney: newBalance,
      }));

      console.log(
        `Balance updated in Firestore and local state: ${newBalance}`
      );
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
