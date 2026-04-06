import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Resumen" subtitle="Créditos activos hoy" />
        <Card.Content>
          <Text variant="bodyMedium">Aquí irá la lista de préstamos y clientes.</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.replace('Login')}>Cerrar Sesión</Button>
          <Button mode="contained">Nuevo Préstamo</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 20,
  }
});
