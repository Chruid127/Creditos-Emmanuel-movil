import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginScreen({ navigation }) {
  const [tenantCode, setTenantCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    setLoading(true);
    // Llamada HTTP real
    const result = await login(tenantCode, email, password);
    setLoading(false);

    if (result.success) {
      navigation.replace('MainTabs');
    } else {
      // Mostrar error del backend
      alert(result.error || "Error de inicio de sesión");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#4caf50', '#1b5e20']}
        style={styles.topBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Title style={styles.mainTitle}>Créditos Emmanuel</Title>
        <Text style={styles.mainSubtitle}>Portal de Colaboradores</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.card}>
          <TextInput
            label="Código de Organización"
            value={tenantCode}
            onChangeText={setTenantCode}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            placeholder="Ej: EMP-001"
            left={<TextInput.Icon icon="domain" />}
            theme={{ roundness: 10 }}
          />

          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            theme={{ roundness: 10 }}
          />

          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
            theme={{ roundness: 10 }}
          />

          <Button 
            mode="contained" 
            onPress={handleLogin}
            loading={loading}
            disabled={loading || !email || !password}
            style={styles.button}
            contentStyle={styles.buttonContent}
            buttonColor="#2e7d32"
          >
            {loading ? "Conectando al servidor..." : "Iniciar Sesión Segura"}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBackground: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#e8f5e9',
    marginTop: 5,
  },
  formContainer: {
    flex: 0.65,
    padding: 20,
    marginTop: -40, // Superposición sobre el fondo verde
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 15,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 10,
  }
});
