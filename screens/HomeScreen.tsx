import { View, Text, SafeAreaView, SafeAreaViewBase } from "react-native";
import React from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import Carrusel from "../components/Carrusel";
import SearchInput from "../components/SearchImput";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center ">
      <View className="flex-row">
        <SearchInput />
      </View>
      <Text className=" text-2xl font-bold ">Rutinas </Text>
      <Carrusel />
    </View>
  );
}
