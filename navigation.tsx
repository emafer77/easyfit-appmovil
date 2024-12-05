import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import QRScreen from "./screens/QRScreen";
import NotificationScreen from "./screens/NotificationScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import Carrusel from "./components/Carrusel";
import DetalleEjercicio from "./components/DetalleEjercicio";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function MyTabs() {
  {
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "purple",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={MyStackWorkout} // Usa el Stack Navigator aquí
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigtion() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

function MyStack() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DetalleEjercicio" component={DetalleEjercicio} />
    </HomeStack.Navigator>
  );
}

function MyStackWorkout() {
  return (
    <HomeStack.Navigator
      initialRouteName="WorkoutScreen"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <HomeStack.Screen name="DetalleEjercicio" component={DetalleEjercicio} />
    </HomeStack.Navigator>
  );
}
