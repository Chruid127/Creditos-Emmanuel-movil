import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import apiClient from '../api/config';

export const useAuthStore = create((set, get) => ({
  user: null,         
  tenant: null,       
  token: null,        
  isAuthenticated: false,
  
  // Función para conectarse a Next.js y validar credenciales
  login: async (tenantCode, email, password) => {
    try {
      // POST al servidor real de Next.js
      const res = await apiClient.post('/auth/login', { 
        organizacion: tenantCode, 
        correo: email, 
        contrasena: password 
      });

      // El servidor de Next.js envía algo como {ok: true, usuario: {...}}
      if (res.data.ok) {
        const { usuario } = res.data;

        // 1. Guardar Tenant ID para logs
        await SecureStore.setItemAsync('tenantId', tenantCode);

        // 2. Poblar la aplicación (Estados locales para velocidad)
        set({
          user: {
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.correo,
            role: usuario.role,
            avatar: "https://i.pravatar.cc/150?u=" + usuario.correo // Fallback simple de Avatar
          },
          tenant: { id: tenantCode, name: tenantCode }, // Asume el tenant dado por el usuario
          isAuthenticated: true
        });
        return { success: true };
      }
    } catch (error) {
      console.error("Login failed", error);
      // Extraemos el mensaje del API o mostramos uno estándar
      const message = error.response?.data?.message || "Servidor no disponible o datos erróneos";
      return { success: false, error: message };
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('tenantId');
    set({ user: null, tenant: null, token: null, isAuthenticated: false });
  }
}));
