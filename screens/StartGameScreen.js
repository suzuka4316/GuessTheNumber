import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  // MEMO -- one of the APIs to talk with native device
  Keyboard,
} from "react-native";

import { Card, Input } from "../components";
import { Colors } from "../constants/Colors";

export const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const numberInputHandler = (inputText) => {
    // MEMO -- Replace any input that is not a number to empty string
    setEnteredValue(inputText.replace(/[^0-9]/g), "");
  };

  return (
    // MEMO -- Registering a touch listener without giving any visual feedback for ios to close the keyboard
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            // MEMO -- This works only for Android
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            // MEMO -- This only works for ios. Decimal key is disabled.
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={() => {}}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={() => {}}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: 300,
    // MEMO -- maxWidth in case of smaller screen devices
    maxWidth: "80%",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
});
