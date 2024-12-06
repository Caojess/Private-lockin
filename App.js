import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import CompeteScreen from "./screens/CompeteScreen";
import FriendsScreen from "./screens/FriendsScreen";
import AndyCompetition from "./screens/AndyCompetition";
import MiaCompetition from "./screens/MiaCompetition";
import AddFriends from "./screens/AddFriends";
import FriendRequestsScreen from "./screens/FriendRequestsScreen";
import JoinScreen from "./screens/JoinScreen";
import CurrentGameScreen from "./screens/CurrentGameScreen";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import InfoScreen from "./screens/InfoScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SetupCompetitionScreen from "./screens/SetupCompetitionScreen";
import InviteFriendsScreen from "./screens/InviteFriendsScreen";
import ShareInviteScreen from "./screens/ShareInviteScreen";
import ViewCompetition from "./screens/ViewCompetition";
import HeadToHeadMia from "./screens/HeadToHeadMia";
import HeadToHeadHarper from "./screens/HeadToHeadHarper";
import MyCompetitionDetailsScreen from "./screens/MyCompetitionDetailsScreen";

// Create Competition Context
export const CompetitionContext = createContext();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Shared Header for Screens
const sharedScreenOptions = ({ navigation }) => ({
  headerTintColor: "black",
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#fff" },
  headerBackTitleVisible: false,
  headerBackTitle: null, // Ensure no text fallback occurs
  headerBackImage: () => (
    <Ionicons
      name="arrow-back"
      size={24}
      color="#000"
      style={{ marginLeft: 16 }}
    />
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Info")}
      style={{ marginRight: 16 }}
    >
      <Ionicons name="help-circle-outline" size={28} color="#000" />
    </TouchableOpacity>
  ),
});

// Stack for authenticated screens (with tabs)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={sharedScreenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "LOCKIN", headerLeft: () => null }}
      />
      <Stack.Screen name="Compete" component={CompeteScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen
        name="CurrentGame"
        component={CurrentGameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Info" component={InfoScreen} />

      <Stack.Screen
        name="SetupCompetition"
        component={SetupCompetitionScreen}
        options={{ title: "Setup Competition" }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriendsScreen}
        options={{ title: "Invite Friends" }}
      />
      <Stack.Screen
        name="ShareInvite"
        component={ShareInviteScreen}
        options={{ title: "Share Invite" }}
      />
      <Stack.Screen
        name="MyCompetitionDetails"
        component={MyCompetitionDetailsScreen}
        options={{ title: "Competition Details" }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={sharedScreenOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route, navigation }) => ({
          title: "Profile",
          headerLeft: route.params?.fromStats
            ? () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
              )
            : null, // No back button in other cases
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Info")}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="help-circle-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
}

function FriendsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          title: "Friends",
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{ marginRight: 16 }} // Removed navigation
            >
              <Ionicons name="help-circle-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AndyCompetition"
        component={AndyCompetition}
        options={{ title: "Andy's Competition" }}
      />
      <Stack.Screen
        name="MiaCompetition"
        component={MiaCompetition}
        options={{ title: "Mia's Competition" }}
      />
      <Stack.Screen
        name="AddFriends"
        component={AddFriends}
        options={{ title: "Add Friends" }}
      />
      <Stack.Screen
        name="FriendRequests"
        component={FriendRequestsScreen}
        options={{ title: "Friend Requests" }}
      />
    </Stack.Navigator>
  );
}

function ProgressStack() {
  const { inCompetition } = React.useContext(CompetitionContext);

  return (
    <Stack.Navigator screenOptions={sharedScreenOptions}>
      {inCompetition ? (
        <Stack.Screen
          name="CurrentGame"
          component={CurrentGameScreen}
          options={{ title: "Current Game", headerLeft: () => null }}
        />
      ) : (
        <Stack.Screen
          name="NoCompetition"
          component={() => (
            <View style={styles.centeredView}>
              <View style={styles.popupContainer}>
                <Text style={styles.popupTitle}>Competition Not Joined</Text>
                <Text style={styles.popupMessage}>
                  You haven't joined a competition yet. Please return to the
                  home page and select a competition to view your progress.
                </Text>
                {/* Button does not navigate anymore */}
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                  <Text style={styles.buttonText}>Go Back to Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          options={{ title: "Progress", headerLeft: () => null }}
        />
      )}

<Stack.Screen 
  name="ViewCompetition" 
  component={ViewCompetition} 
  options={{ title: "Competition Feed" }} 
/>
<Stack.Screen 
  name="HeadToHeadMia" 
  component={HeadToHeadMia} 
  options={{ title: "" }} 
/>
<Stack.Screen 
  name="HeadToHeadHarper" 
  component={HeadToHeadHarper} 
  options={{ title: "" }} 
/>
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Progress")
            iconName = focused ? "trophy" : "trophy-outline";
          else if (route.name === "Friends")
            iconName = focused ? "people" : "people-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Progress" component={ProgressStack} />
      <Tab.Screen name="Friends" component={FriendsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />

    </Tab.Navigator>
  );
  
}
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true, // Default to showing headers
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "black",
        headerTitleAlign: "center",
      }}
    >
      {/* Login screen with no header */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* Welcome screen with a default header */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome to LockIn" }}
      />

      {/* MainTabs integrates the bottom tab navigation */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }} // Hide header for MainTabs
      />

      {/* Competition-related screens with headers */}
      <Stack.Screen
        name="SetupCompetition"
        component={SetupCompetitionScreen}
        options={{ title: "Setup Competition" }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriendsScreen}
        options={{ title: "Invite Friends" }}
      />
      <Stack.Screen
        name="ShareInvite"
        component={ShareInviteScreen}
        options={{ title: "Share Invite" }}
      />
      <Stack.Screen
        name="MyCompetitionDetails"
        component={MyCompetitionDetailsScreen}
        options={{ title: "Competition Details" }}
      />

      {/* Home screen for navigation */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      {/* Andy screen for navigation */}
      <Stack.Screen
        name="AndyCompetition"
        component={AndyCompetition}
        options={{ title: "Andy's Competition" }}
      />
    </Stack.Navigator>
  );
}




export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inCompetition, setInCompetition] = useState(false);

  return (
    <CompetitionContext.Provider value={{ inCompetition, setInCompetition }}>
      <NavigationContainer>
        {isLoggedIn ? <MainTabs /> : <AuthStack />}
      </NavigationContainer>
    </CompetitionContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 90,
  },
  noCompetitionText: {
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Added padding for better layout
  },
  popupContainer: {
    width: "100%",
    maxWidth: 280,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 14, // Adjusted font size for better readability
    textAlign: "left", // Align the message to the left
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: "100%", // Ensure the button is full width for better UI
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
