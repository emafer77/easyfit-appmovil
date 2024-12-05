import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ejercicios = [
  {
    grupo: "Pecho",
    ejercicios: [
      {
        id: 1,
        musculo: "pecho",
        nombre: "Press Banca",
        categoria: "hipertrofia",
        descripcion: "Acuéstese plano en el banco, con los pies en el suelo.",
        video:
          "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1",
        imagen:
          "https://www.muscularstore.es/blog/wp-content/uploads/2019/05/Press-de-banca-con-barra.jpg",
      },
      {
        id: 1,
        musculo: "pecho",
        nombre: "Press Banca",
        categoria: "hipertrofia",
        descripcion: "Acuéstese plano en el banco, con los pies en el suelo.",
        video:
          "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1",
        imagen:
          "https://www.muscularstore.es/blog/wp-content/uploads/2019/05/Press-de-banca-con-barra.jpg",
      },
    ],
  },
   {
    grupo: "Espalda",
    ejercicios: [
      {
        id: 1,
        musculo: "pecho",
        nombre: "Press Banca",
        categoria: "hipertrofia",
        descripcion: "Acuéstese plano en el banco, con los pies en el suelo.",
        video:
          "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1",
        imagen:
          "https://www.muscularstore.es/blog/wp-content/uploads/2019/05/Press-de-banca-con-barra.jpg",
      },
      {
        id: 1,
        musculo: "pecho",
        nombre: "Press Banca",
        categoria: "hipertrofia",
        descripcion: "Acuéstese plano en el banco, con los pies en el suelo.",
        video:
          "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1",
        imagen:
          "https://www.muscularstore.es/blog/wp-content/uploads/2019/05/Press-de-banca-con-barra.jpg",
      },
    ],
  },
];

const WorkoutScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEjercicios, setFilteredEjercicios] = useState(ejercicios);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const filtered = ejercicios
      .map((grupo) => ({
        ...grupo,
        ejercicios: grupo.ejercicios.filter((ejercicio) =>
          ejercicio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((grupo) => grupo.ejercicios.length > 0);

    setFilteredEjercicios(filtered);
  }, [searchTerm]);

  const toggleGroup = (index) => {
    setExpandedGroup(expandedGroup === index ? null : index);
  };

  const handleEjercicioPress = (ejercicio) => {
    navigation.navigate("DetalleEjercicio", { ejercicio });
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-center mb-4 mt-5">
        Lista de ejercicios
      </Text>

      {/* Campo de búsqueda */}
      <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 mb-4">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="flex-1 text-base"
          placeholder="Buscar ejercicios..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Lista de grupos de ejercicios */}
      <FlatList
        data={filteredEjercicios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="mb-3">
            <TouchableOpacity
              onPress={() => toggleGroup(index)}
              className="py-3 px-4 bg-gray-200 rounded-lg"
            >
              <Text className="text-lg font-semibold">{item.grupo}</Text>
            </TouchableOpacity>
            {expandedGroup === index && (
              <View className="pl-4 mt-2">
                {item.ejercicios.map((ejercicio, ejIndex) => (
                  <TouchableOpacity
                    key={ejIndex}
                    onPress={() => handleEjercicioPress(ejercicio)}
                  >
                    <Text className="text-base mb-1 font-bold">
                      {ejercicio.nombre}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {ejercicio.descripcion} - {ejercicio.dificultad}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default WorkoutScreen;
