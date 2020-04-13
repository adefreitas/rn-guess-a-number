import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

export default function Input(props: any) {
  return <TextInput {...props} style={{...styles.input, ...props.style}}/>
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor:  Colors.borderColor,
    width: '80%',
    textAlign: 'center'
  },
});