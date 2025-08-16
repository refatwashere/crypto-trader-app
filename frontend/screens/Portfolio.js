import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../services/api';

export default function Portfolio() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.get('/portfolio')
      .then(res => { if (mounted) setHoldings(res.data.holdings || []) })
      .catch(() => {});
    return () => { mounted = false };
  }, []);

  return (
    <View style={{flex:1, padding:16}}>
      <Text style={{fontSize:18, marginBottom:8}}>Portfolio</Text>
      <FlatList
        data={holdings}
        keyExtractor={(i) => i.symbol}
        renderItem={({item}) => (
          <View style={{padding:8,borderBottomWidth:1,borderColor:'#eee'}}>
            <Text>{item.symbol}: {item.quantity} (@ {item.avgPrice})</Text>
          </View>
        )}
      />
    </View>
  )
}
