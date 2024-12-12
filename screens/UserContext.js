import React, { createContext, useState } from "react";

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

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
