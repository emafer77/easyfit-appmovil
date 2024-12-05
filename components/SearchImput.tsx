import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const SearchInput = () => {
  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");
  const [texto, setTexto] = useState("");
  return (
    <View className="align-items-center p-4 ">
      <TextInput
        className="w-80 h-12 border border-gray-300 rounded-lg p-3 text-base bg-white mt-10"
        placeholder="Buscar..."
        value={texto}
        onChangeText={setTexto}
      />
    </View>
  );
};

export default SearchInput;
