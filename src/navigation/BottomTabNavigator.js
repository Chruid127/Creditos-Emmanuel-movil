import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteScreen from '../screens/RouteScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { startLocationTracking } from '../services/LocationTracking';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  useEffect(() => {
    // Disparar las solicitudes de permisos de GPS al entrar a la zona segura de la app
    startLocationTracking();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Route"
      screenOptions={{
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen 
        name="Route" 
        component={RouteScreen} 
        options={{ 
          title: 'Ruta Hoy',
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-marker-path" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Collection" 
        component={CollectionScreen} 
        options={{ 
          title: 'Cobrar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash-register" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
