import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  // MEMO -- Avoids keyboard to overlap the input a user is typing in
  KeyboardAvoidingView,
  // MEMO -- APIs to talk with native device
  Keyboard,
  Alert,
  // MEMO -- to determine the width and the height of the device
  Dimensions,
} from "react-native";

import {
  BodyText,
  Card,
  Input,
  MainButton,
  NumberContainer,
  TitleText,
} from "../components";
import { Colors } from "../constants/Colors";

export const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);
    // MEMO -- clean up function that runs before the useEffect function runs.
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    //Replace any input that is not a number to empty string
    setEnteredValue(inputText.replace(/[^0-9]/g), "");
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Input must be a number between 1 and 99.",
        [{ text: "Ok", style: "destructive", onPress: resetInputHandler }]
      );
      //finish the function execution because the value is invalid
      return;
    }
    setConfirmed(true);
    // MEMO -- it doesn't matter in which order you call these 2 set states because all the states functions are batched together, and the change will be implemented on the next render cycle.
    setEnteredValue("");
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedMessageContainer}>
        <Text>You've selected:</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View>
          <MainButton
            color={Colors.primary}
            //Triggers startGameHandler in App.js
            onPress={() => props.onStartGame(selectedNumber)}
          >
            START GAME
          </MainButton>
        </View>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        {/* MEMO -- Registering a touch listener without giving any visual feedback
      for ios to close the keyboard */}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
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
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.secondary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {/* If 'undefined', nothing will be printed */}
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // button: {
  //   // width: 110,
  //   // MEMO -- dimentions are only calculated when the app starts, so it wouldn't be responsive to the orientation change
  //   width: Dimensions.get("window").width / 4,
  // },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  confirmedMessageContainer: {
    marginTop: 10,
    // MEMO -- alignItems is 'stretch' on default -> stretch children of a container to match the height of the container's cross axis
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: "80%",
    // MEMO -- default size is 80%, but minimum width is 300 px and maximum width is 95 %
    minWidth: 300,
    maxWidth: "95%",
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
    // MEMO -- 2 fonts identifiers defined in App.js. Can be accessed anywhere in the app.
    fontFamily: "open-sans-bold",
  },
});
