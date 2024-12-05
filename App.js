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
        options={{ title: "Create Competition" }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriendsScreen}
        options={{ title: "Create Competition" }}
      />
      <Stack.Screen
        name="ShareInvite"
        component={ShareInviteScreen}
        options={{ title: "Create Competition" }}
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
        options={({ navigation }) => ({
          title: "Profile",
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
              onPress={() => navigation.navigate("Info")}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="help-circle-outline" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="AndyCompetition" component={AndyCompetition} />
      <Stack.Screen name="MiaCompetition" component={MiaCompetition} />
      <Stack.Screen name="AddFriends" component={AddFriends} />
      <Stack.Screen name="FriendRequests" component={FriendRequestsScreen} />
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
              <Text style={styles.noCompetitionText}>
                You have not joined a competition yet
              </Text>
            </View>
          )}
          options={{ title: "Progress", headerLeft: () => null }}
        />
      )}
      
      <Stack.Screen name="ViewCompetition" component={ViewCompetition} />
      <Stack.Screen name="HeadToHeadMia" component={HeadToHeadMia} />
      <Stack.Screen name="HeadToHeadHarper" component={HeadToHeadHarper} />
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
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
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
    alignSelf: "center",
    top: 300,
  },
});
