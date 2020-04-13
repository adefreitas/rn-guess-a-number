import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

export default function GameOverScreen(props: any) {
  return (
    <View style={styles.screen}>
      <TitleText>Game over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.image}
          resizeMode='cover'
        />
      </View> 
      <TitleText>🎩🐇</TitleText>
      <TitleText>Your number is <Text style={styles.highlight}>{props.userNumber}</Text></TitleText>
      <BodyText style={styles.message}>
        It took our little robot <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess your number
      </BodyText>
      <MainButton onPress={props.onStartGame}>Start a new game</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  message: {
    textAlign: 'center',
    width: 250,
    margin: 20
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 125,
    overflow: 'hidden',
    margin: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
})