import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '../services/auth';

export default function Login({ navigation }) {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const save = async () => {
    if (!apiKey || !apiSecret) return Alert.alert('Both key and secret are required');
    try {
      await auth.saveKeys({ apiKey, apiSecret });
      Alert.alert('Saved', 'API keys saved securely');
      navigation.replace('Dashboard');
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to save keys');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter API Key & Secret</Text>
      <TextInput
        style={styles.input}
        placeholder="API Key"
        value={apiKey}
        onChangeText={setApiKey}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="API Secret"
        value={apiSecret}
        onChangeText={setApiSecret}
        autoCapitalize="none"
        secureTextEntry
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 18, marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
});
