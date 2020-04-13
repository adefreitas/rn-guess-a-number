import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Card from '../components/Card';

import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

export default function StartGameScreen(props: {onStartGame: (selectedNumber: number) => void}) {
  let confirmedOutput;
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Uh, invalid number',
        'Your number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  if (confirmed) {
    if (selectedNumber != null) {
    confirmedOutput = (<Card style={styles.summaryContainer}>
      <Text>You've selected</Text>
      <View>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)}/>
      </View>
    </Card>);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start new game</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText >
          <Input
            keyboardType='number-pad'
            blurOnSubmit
            autoCorrect={false}
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}/>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='Reset' color={Colors.cancel} onPress={resetInputHandler} />
            </View>
            <View style={styles.button}>
              <Button title='Start' color={Colors.confirm} onPress={(confirmInputHandler)} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputContainer: {
    margin: 20,
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  button: {
    maxWidth: '50%',
    width: 100,
  },
  summaryContainer: {
    textAlign: 'center',
    alignItems: 'center'
  }
});