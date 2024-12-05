import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRAccessControlRN() {
  const [qrValue, setQrValue] = useState("");
  const [entryUsed, setEntryUsed] = useState(false);
  const [exitUsed, setExitUsed] = useState(false);

  const generateQR = () => {
    const newQRValue = `ACCESS-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setQrValue(newQRValue);
    setEntryUsed(false);
    setExitUsed(false);
  };

  const handleEntry = () => {
    if (!entryUsed) {
      setEntryUsed(true);
      Alert.alert("Éxito", "Entrada registrada");
    } else {
      Alert.alert("Aviso", "La entrada ya ha sido registrada");
    }
  };

  const handleExit = () => {
    if (entryUsed && !exitUsed) {
      setExitUsed(true);
      Alert.alert("Éxito", "Salida registrada");
    } else if (!entryUsed) {
      Alert.alert("Aviso", "Debe registrar la entrada primero");
    } else {
      Alert.alert("Aviso", "La salida ya ha sido registrada");
    }
  };

  const canGenerateNew = entryUsed && exitUsed;

  return (
    <View className="flex-1 items-center justify-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-5">Control de Acceso QR</Text>
      <View className="bg-white p-5 rounded-lg mb-5">
        {qrValue ? (
          <QRCode value={qrValue} size={200} />
        ) : (
          <Text className="text-gray-400 text-center">
            No hay código QR generado
          </Text>
        )}
      </View>
      <View className="flex-row justify-between w-full mb-5">
        <TouchableOpacity
          className={`bg-blue-500 p-3 rounded-lg flex-1 mx-1 ${
            !qrValue || entryUsed ? "bg-gray-400" : ""
          }`}
          onPress={handleEntry}
          disabled={!qrValue || entryUsed}
        >
          <Text className="text-white text-center font-bold">
            Registrar Entrada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-blue-500 p-3 rounded-lg flex-1 mx-1 ${
            !qrValue || !entryUsed || exitUsed ? "bg-gray-400" : ""
          }`}
          onPress={handleExit}
          disabled={!qrValue || !entryUsed || exitUsed}
        >
          <Text className="text-white text-center font-bold">
            Registrar Salida
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className={`bg-blue-500 p-3 rounded-lg w-full ${
          !canGenerateNew && qrValue !== "" ? "bg-gray-400" : ""
        }`}
        onPress={generateQR}
        disabled={!canGenerateNew && qrValue !== ""}
      >
        <Text className="text-white text-center font-bold">
          {qrValue ? "Generar Nuevo QR" : "Generar QR"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
