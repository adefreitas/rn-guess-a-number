import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}

export default function GameScreen(this: any, props: any) {
  const {userChoice, onGameOver} = props;
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice),
  );
  
  const [currentRounds, setCurrentRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(currentRounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && (currentGuess < userChoice || currentGuess === 1)) ||
      (direction === 'greater' && (currentGuess > userChoice || currentGuess === 99))
    ) {
      Alert.alert(
        'That\'s impossible!',
        'That hint and the number you gave the robot at the beginning don\'t quite add up',
        [{text: 'To the bat cave!', style: 'cancel'}],
      );
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    setCurrentGuess(
      generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    );
    setCurrentRounds(currentRounds+1);
  };

  return (
    <View style={styles.screen}>
      <Text>Robot's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')}/>
        <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')}/>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    maxWidth: '80%',
  }
});