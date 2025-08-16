import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function Dashboard() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/prices')
      .then(res => setPrices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View>
      {Object.entries(prices).map(([symbol, price]) => (
        <Text key={symbol}>{symbol}: ${price}</Text>
      ))}
    </View>
  );
}
// frontend/screens/Dashboard.js - Dashboard screen displaying cryptocurrency prices