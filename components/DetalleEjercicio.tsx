import * as React from "react";
import { Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useVideoPlayer, VideoView } from "expo-video";
import { ScrollView } from "react-native-gesture-handler";

export default function DetalleEjercicio() {
  const route = useRoute();
  const { ejercicio } = route.params; // Obtén el ejercicio de los parámetros

  // Configuración del reproductor de video
  const player = useVideoPlayer(ejercicio.video, (player) => {
    player.loop = true;
  });

  return (
    <ScrollView className="flex-1 pb-6">
      <View className="flex-1 items-center px-5 pt-5">
        <Text className="text-3xl font-bold text-center mb-2 mt-5">
          {ejercicio.nombre}
        </Text>
        <Text className="text-lg text-gray-500 text-center mb-2">
          {ejercicio.musculo}
        </Text>
        <Text className="text-base text-gray-700 text-center mb-5">
          {ejercicio.categoria}
        </Text>

        <Text className="text-sm text-justify text-gray-800 leading-6 mb-5">
          {ejercicio.descripcion}
        </Text>

        <Image
          source={{ uri: ejercicio.imagen }}
          className="w-full h-48 rounded-lg mb-5"
        />

        <VideoView
          style={{ width: 350, height: 275 }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          className="mb-5"
        />
      </View>
    </ScrollView>
  );
}
