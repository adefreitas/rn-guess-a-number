import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Card(props: any) {
  return <View style={{...styles.card, ...props.style}}>
    {props.children}
  </View>
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.10,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  }
});
