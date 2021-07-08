import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { NumberContainer, Card } from "../components";

// MEMO -- If a function don't rely on props or state, that function can be defined outside of functional component
const generateRandomBetween = (min, max, exclude) => {
  // rounds up
  min = Math.ceil(min);
  // rounds down
  max = Math.floor(max);
  // random number between 1 and 99 (１以上９９以下)
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    // MEMO -- RECURSION
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

export const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="GREATER" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});
