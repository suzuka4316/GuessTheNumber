import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

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
  const [rounds, setRounds] = useState(0);

  // MEMO -- useRef allows you to define a value which survives component re-renders. The difference to the useState is that the component doesn't re-render even if the value is changed.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // MEMO -- Object Destructuring: pulling out only userChoice and onGameOver from props passed from parent component
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
    //if any of these dependency values change, then call function defined in useEffect after the functional component was rendered.
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Wait a sec", "You know that's wrong...", [
        { text: "My bad!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    // MEMO -- re-rendering the component here, not when changing the value of currentLow and currentHigh
    setCurrentGuess(nextGuess);
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* MEMO -- this also works: () => nextGuessHandler('lower') */}
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
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
