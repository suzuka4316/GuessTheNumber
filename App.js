import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import { Header } from "./components";
import { StartGameScreen, GameScreen } from "./screens";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  //default screen is StartGameScreen
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber) {
    //if number is chosen by a user, render GameScreen
    content = <GameScreen userChoice={userNumber} />;
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
