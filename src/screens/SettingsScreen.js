import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Button, Card, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../store/useAuthStore';

export default function SettingsScreen({ navigation }) {
  const { user, tenant, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  if (!user) return null; // Prevenir render sin datos

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera Premium */}
      <LinearGradient
        colors={['#1b5e20', '#4caf50']}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileSection}>
          <Avatar.Image 
            size={90} 
            source={{ uri: user.avatar }} 
            style={styles.avatar}
          />
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.roleText}>{user.role}</Text>
        </View>
      </LinearGradient>

      {/* Tarjeta de Información de Empresa */}
      <View style={styles.content}>
        <Card style={styles.infoCard} mode="elevated">
          <Card.Title 
            title={tenant?.name} 
            subtitle={`Cod: ${tenant?.id}`}
            left={(props) => <Icon name="domain" size={30} color="#2e7d32" />}
          />
          <Card.Content>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <Icon name="email" size={20} color="#666" />
              <Text style={styles.rowText}>{user.email}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" size={20} color="#666" />
              <Text style={styles.rowText}>{user.phone}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Panel de Geolocalización (Preparado) */}
        <Card style={styles.gpsCard}>
          <View style={styles.gpsRow}>
            <View style={styles.gpsInfo}>
              <Text style={styles.gpsTitle}>Sincronización GPS</Text>
              <Text style={styles.gpsSubtitle}>Activo en segundo plano</Text>
            </View>
            <Icon name="radar" size={35} color="#4caf50" />
          </View>
        </Card>

        <Button 
          mode="contained-tonal" 
          icon="logout"
          style={styles.logoutBtn} 
          textColor="#d32f2f"
          buttonColor="#ffebee"
          onPress={handleLogout}
        >
          Cerrar Sesión Segura
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackground: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#fff',
  },
  nameText: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  roleText: {
    fontSize: 16,
    color: '#e8f5e9',
    opacity: 0.9,
  },
  content: {
    padding: 20,
    marginTop: -30, // Para superponer sobre el gradiente
  },
  infoCard: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  divider: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rowText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#424242',
  },
  gpsCard: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 30,
  },
  gpsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  gpsSubtitle: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 2,
  },
  logoutBtn: {
    borderRadius: 10,
    paddingVertical: 5,
  }
});
