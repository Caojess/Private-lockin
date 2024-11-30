import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CompeteScreen from './screens/CompeteScreen';
import FriendsScreen from './screens/FriendsScreen';
import AndyCompetition from './screens/AndyCompetition';
import MiaCompetition from './screens/MiaCompetition';
import JoinScreen from './screens/JoinScreen';
import CurrentGameScreen from './screens/CurrentGameScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import InfoScreen from './screens/InfoScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Shared Header for Screens
const sharedScreenOptions = ({ navigation }) => ({
  headerTintColor: 'black',
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#fff' },
  headerBackTitleVisible: false, // Completely hide back button text
  headerBackTitle: '', // Ensure no inherited titles are displayed
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
      onPress={() => navigation.navigate('Info')} // Navigate to Info screen
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
        options={{ title: 'LOCKIN' }} // Custom title for Home
      />
      <Stack.Screen name="Compete" component={CompeteScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen
        name="CurrentGame"
        component={CurrentGameScreen}
        options={{ headerShown: false }} // No header for CurrentGame
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AndyCompetition"
        component={AndyCompetition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MiaCompetition"
        component={MiaCompetition}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main Tabs (after login)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Progress" component={() => <View />} />
      <Tab.Screen name="Friends" component={FriendsStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Unauthenticated Screens (Login and Welcome)
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Hide header for both Login and Welcome
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Login state

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs /> // Show tabs if logged in
      ) : (
        <AuthStack /> // Show login and welcome if not logged in
      )}
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000', // Black background
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 90,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
