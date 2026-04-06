import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import apiClient from '../api/config';
import { useAuthStore } from '../store/useAuthStore';

const LOCATION_TASK_NAME = 'BACKGROUND_LOCATION_TASK';

// 1. Definimos la tarea en el TaskManager global de Expo
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Task Manager error:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    // locations es un array. Tomamos el último registrado.
    const lastLocation = locations[0];
    
    // Obtenemos de Zustand si estamos logueados para saber a nombre de quién enviar los datos
    const state = useAuthStore.getState();
    if (state.isAuthenticated && state.user) {
      try {
        // Ejecutamos la petición HTTPS silenciosa por detrás usando nuestro Axios ya configurado
        await apiClient.post('/gps/track', {
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
          timestamp: lastLocation.timestamp,
        });
        console.log("GPS Sincronizado:", lastLocation.coords.latitude);
      } catch (err) {
        console.error("GPS Falló el envío al sistema central", err.message);
      }
    }
  }
});

// 2. Función para solicitar todos los permisos e iniciar de inmediato
export async function startLocationTracking() {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 15, // Envía a servidor cada 15 metros 
        timeInterval: 30000,  // O envía máximo cada 30 segundos
        deferredUpdatesInterval: 30000,
        showsBackgroundLocationIndicator: true, // Requisito en iOS
      });
      console.log("Servicio GPS en segundo plano: ACTIVO");
    } else {
      console.log("Se denegó rastreo en segundo plano");
    }
  } else {
    console.log("Se denegó el GPS frontal");
  }
}
