import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Trade from './screens/Trade';
import Portfolio from './screens/Portfolio';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Trade" component={Trade} />
        <Stack.Screen name="Portfolio" component={Portfolio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// frontend/App.js - Main application component with navigation setup