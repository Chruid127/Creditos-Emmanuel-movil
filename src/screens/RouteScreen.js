import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';

export default function RouteScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title="Cobros de Hoy" 
          subtitle="Tienes 15 clientes por visitar" 
          left={(props) => <Avatar.Icon {...props} icon="map-marker-path" />}
        />
        <Card.Content>
          <Text variant="bodyMedium">Aquí se listará la ruta geolocalizada en base a los clientes del Tenant.</Text>
        </Card.Content>
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
    marginTop: 10,
  }
});
