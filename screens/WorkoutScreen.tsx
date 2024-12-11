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
import axios from "axios";

interface Exercise {
  id: number;
  name: string;
  description: string;
  muscle: string;
  category: string;
  videourl: string;
  imageurl: string;
}

interface GroupedExercise {
  groupName: string;
  exercises: Exercise[];
}

const WorkoutScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<GroupedExercise[]>(
    []
  );
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const navigation = useNavigation();
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.0.123:5000/exercises/"); //aqui se sustituye la ip de su ordenador
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Hubo un problema al cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const groupedData = groupExercisesByCategory(data);
      const filtered = groupedData
        .map((group) => ({
          ...group,
          exercises: group.exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((group) => group.exercises.length > 0);

      setFilteredExercises(filtered);
    }
  }, [searchTerm, data]);

  const groupExercisesByCategory = (
    exercises: Exercise[]
  ): GroupedExercise[] => {
    const grouped: { [key: string]: Exercise[] } = {};

    exercises.forEach((exercise) => {
      const muscle = exercise.muscle;
      if (!grouped[muscle]) {
        grouped[muscle] = [];
      }
      grouped[muscle].push(exercise);
    });

    return Object.keys(grouped).map((key) => ({
      groupName: key,
      exercises: grouped[key],
    }));
  };

  const toggleGroup = (index: number) => {
    setExpandedGroup(expandedGroup === index ? null : index);
  };

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate("DetalleEjercicio", { exercise });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-blue-500">Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

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

      <FlatList
        data={filteredExercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="mb-3">
            <TouchableOpacity
              onPress={() => toggleGroup(index)}
              className="py-3 px-4 bg-gray-200 rounded-lg"
            >
              <Text className="text-lg font-semibold">{item.groupName}</Text>
            </TouchableOpacity>
            {expandedGroup === index && (
              <View className="pl-4 mt-2">
                {item.exercises.map((exercise, ejIndex) => (
                  <TouchableOpacity
                    key={ejIndex}
                    onPress={() => handleExercisePress(exercise)}
                  >
                    <Text className="text-base mb-1 font-bold">
                      {exercise.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {exercise.description} - {exercise.muscle}
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
