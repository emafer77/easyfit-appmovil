import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Datos de ejemplo para las notificaciones
const notificaciones = [
  {
    id: 1,
    tipo: "evento",
    titulo: "Reunión de equipo",
    fecha: "2024-11-25T10:00:00",
    descripcion: "Discusión sobre el nuevo proyecto",
  },
  {
    id: 2,
    tipo: "evento",
    titulo: "Webinar de marketing",
    fecha: "2024-11-27T15:00:00",
    descripcion: "Estrategias de crecimiento para 2025",
  },
  {
    id: 3,
    tipo: "membresia",
    titulo: "Membresía próxima a vencer",
    fecha: "2024-12-15T00:00:00",
    descripcion: "Tu membresía expira en 25 días",
  },
];

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(notificaciones);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center mb-2 mt-5">
        <Ionicons name="notifications-outline" size={24} color="#000" />
        <Text className="text-2xl font-bold ml-2 ">Notificaciones</Text>
      </View>
      <Text className="text-base text-gray-600 mb-5">
        Mantente al día con tus eventos y estado de membresía
      </Text>
      <ScrollView className="flex-1">
        {notifications.length === 0 ? (
          <Text className="text-center text-gray-600 text-lg">
            No tienes notificaciones pendientes.
          </Text>
        ) : (
          notifications.map((notif) => (
            <View
              key={notif.id}
              className="bg-gray-100 rounded-lg p-4 mb-4 border border-gray-200 relative"
            >
              <TouchableOpacity
                className="absolute top-2 right-2 z-10"
                onPress={() => removeNotification(notif.id)}
              >
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
              <View className="flex-row items-start">
                <Ionicons
                  name={
                    notif.tipo === "evento"
                      ? "calendar-outline"
                      : "card-outline"
                  }
                  size={24}
                  color={notif.tipo === "evento" ? "#3498db" : "#f1c40f"}
                />
                <View className="ml-4 flex-1">
                  <Text className="text-lg font-bold mb-1">{notif.titulo}</Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    {formatDate(notif.fecha)}
                  </Text>
                  <Text className="text-base">{notif.descripcion}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
