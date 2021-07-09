import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";

//default font package
import * as Font from "expo-font";

import { Header } from "./components";
import { StartGameScreen, GameScreen, GameOverScreen } from "./screens";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

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
