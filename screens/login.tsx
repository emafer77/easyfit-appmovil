import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

import "../global.css";
const NotificationScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.70:5000/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        Alert.alert("Éxito", "Inicio de sesión exitoso");
      }
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };
  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl font-bold text-center mb-5">
        Iniciar Sesión
      </Text>
      <TextInput
        className="h-10 border border-gray-400 mb-3 px-3"
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="h-10 border border-gray-400 mb-3 px-3"
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default NotificationScreen;
