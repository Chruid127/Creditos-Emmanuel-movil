import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar, Button } from 'react-native-paper';

export default function CollectionScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title="Registrar Abono" 
          subtitle="Búsqueda rápida de clientes"
          left={(props) => <Avatar.Icon {...props} icon="cash-register" style={{backgroundColor: '#2e7d32'}} />}
        />
        <Card.Content>
          <Text variant="bodyMedium">Acá irá el buscador y el teclado numérico rápido para digitar lo pagado al momento.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Buscar Cliente</Button>
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
    marginTop: 10,
  }
});
