import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Cambia esta URL por la URL real de tu servidor web (Next.js)
// Conexión directa a tu Next.js corriendo localmente
export const API_BASE_URL = 'http://172.24.80.1:3000/api'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ¡CRUCIAL! Para aceptar Cookies de sesión desde Next.js
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor simplificado (Next.js usa cookies secure con httpOnly)
// Solo enviaremos el TenantID explícitamente en headers si tu backend lo llegara a pedir,
// pero las cookies ya viajan automáticamente por el withCredentials.
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const tenantId = await SecureStore.getItemAsync('tenantId');
      if (tenantId) {
        config.headers['X-Tenant-ID'] = tenantId; 
      }
    } catch (error) {
      console.error("Error al obtener credenciales seguras", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
