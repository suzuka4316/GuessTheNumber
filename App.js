import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import { Header } from "./components";
import { StartGameScreen, GameScreen, GameOverScreen } from "./screens";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  //default screen is StartGameScreen
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    //if number is chosen by a user (useNumber is not undefined or null), render GameScreen
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess The Number" />
      {content}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
