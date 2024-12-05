import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  VirtualizedList,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

// Tipos para la estructura de datos de rutinas y ejercicios
type Ejercicio = {
  id: number;
  musculo: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  video: string;
  imagen: string;
};

type Rutina = {
  nivel: string;
  tipo_de_rutina: string;
  descripcion: string;
  ejercicios: Ejercicio[];
};

// Aquí simulas la carga dinámica de rutinas
const fetchRutinas = (): Rutina[] => {
  return [
    {
      nivel: "experto",
      tipo_de_rutina: "movestrong",
      descripcion:
        "Rutina diseñada para mejorar la fuerza funcional, estabilidad y movilidad.",
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
          id: 2,
          musculo: "pecho",
          nombre: "Press Banca inclinado",
          categoria: "hipertrofia",
          descripcion:
            "Acuéstese en el banco inclinado y baje la barra hacia el pecho.",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-incline-bench-press-side_2HBfFN3.mp4#t=0.1",
          imagen:
            "https://www.entrenamientos.com/media/cache/exercise_375/uploads/exercise/press-de-banca-inclinado-con-barra-init-pos-5432.png",
        },
      ],
    },
    {
      nivel: "intermedio",
      tipo_de_rutina: "fullbody",
      descripcion: "Rutina para trabajar todo el cuerpo de manera equilibrada.",
      ejercicios: [
        {
          id: 3,
          musculo: "piernas",
          nombre: "Sentadillas",
          categoria: "hipertrofia",
          descripcion:
            "Póngase de pie con los pies al ancho de los hombros y baje el torso.",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-squat-front.mp4#t=0.1",
          imagen:
            "https://www.muscularstore.es/blog/wp-content/uploads/2019/05/Sentadilla.jpg",
        },
        {
          id: 5,
          musculo: "espalda",
          nombre: "Remo con barra",
          categoria: "hipertrofia",
          descripcion:
            "Colóquese de pie, incline el torso hacia adelante y agarre la barra.",
          video:
            "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-row.mp4#t=0.1",
          imagen:
            "https://www.entrenamientos.com/media/cache/exercise_375/uploads/exercise/remo-con-barra-init-pos-5432.png",
        },
      ],
    },
  ];
};

const Carrusel: React.FC = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const navigation = useNavigation();

  // Estado para almacenar las rutinas
  const [rutinas, setRutinas] = useState<Rutina[]>([]);

  // Cargar las rutinas cuando el componente se monta
  useEffect(() => {
    const rutinasCargadas = fetchRutinas();
    setRutinas(rutinasCargadas); // Aquí puedes hacer la llamada real a una API si es necesario
  }, []);

  const renderEjercicio = ({ item }: { item: Ejercicio }) => (
    <TouchableOpacity
      className="p-4 bg-gray-200 rounded-lg mb-4"
      onPress={
        () => navigation.navigate("DetalleEjercicio", { ejercicio: item }) // Pasa el ejercicio a DetalleEjercicio
      }
    >
      <Text className="text-lg font-semibold">{item.nombre}</Text>
      <Text className="text-sm">{item.musculo}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      {rutinas.length > 0 ? (
        <Carousel
          loop
          width={width}
          height={height - 200}
          autoPlay={false}
          data={rutinas} // Pasas dinámicamente todas las rutinas
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }: { item: Rutina }) => (
            <ScrollView>
              <View className=" bg-gray-50 flex-1 justify-start mx-4 my-4 p-4 border-2 border-gray-400 rounded-lg">
                <Text className="text-center text-2xl font-bold mb-2">
                  {item.tipo_de_rutina.toUpperCase()}
                </Text>
                <Text className="text-center text-xl mb-2">
                  Nivel: {item.nivel}
                </Text>
                <Text className="text-justify text-sm mb-4">
                  {item.descripcion}
                </Text>
                <Text className="text-lg font-semibold mb-2">Ejercicios:</Text>
                <View>
                  {item.ejercicios.map((ejercicio) => (
                    <TouchableOpacity
                      key={ejercicio.id}
                      className="p-4 bg-gray-200 rounded-lg mb-4"
                      onPress={() =>
                        navigation.navigate("DetalleEjercicio", { ejercicio })
                      }
                    >
                      <Text className="text-lg font-semibold">
                        {ejercicio.nombre}
                      </Text>
                      <Text className="text-sm">{ejercicio.musculo}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}
        />
      ) : (
        <Text className="text-center">Cargando rutinas...</Text> // Mensaje mientras se cargan las rutinas
      )}
    </View>
  );
};

export default Carrusel;
