import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Trade({ navigation }) {
  return (
    <View>
      <Text>Trade screen (stub)</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
// frontend/screens/Trade.js - simple stub screen
