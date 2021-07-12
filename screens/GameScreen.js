import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Alert, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// MEMO -- this only works for expo app!
import { ScreenOrientation } from "expo";

import { BodyText, Card, NumberContainer } from "../components";
import MainButton from "../components/MainButton";

// MEMO -- If a function don't rely on props or state, that function can be defined outside of functional component
const generateRandomBetween = (min, max, exclude) => {
  // rounds up
  min = Math.ceil(min);
  // rounds down
  max = Math.floor(max);
  // random number between 1 and 99 (正確には１以上１００未満)
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    // MEMO -- RECURSION
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItems = (value, numOfRounds) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRounds}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

export const GameScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setavailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setavailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setavailableDeviceWidth(Dimensions.get("window").width);
      setavailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    // MEMO -- clean up function that runs before the useEffect function runs.
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  // MEMO -- useRef allows you to define a value which survives component re-renders. The difference to the useState is that the component doesn't re-render even if the value is changed.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // MEMO -- Object Destructuring: pulling out only userChoice and onGameOver from props passed from parent component
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      // MEMO -- if the number is 12 and guess is 85, 85 will be set as the highest number but also is excluded from possible guesses because of how the random number is created.
      currentHigh.current = currentGuess;
    } else {
      // MEMO -- guess has to be unique to map the list of past guesses with unique guess as a key. If the number is 76 and guess is 23, 24 will be set as the lowest number, so 23 will never appear as a future guess.
      currentLow.current = currentGuess + 1;
    }
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    // MEMO -- re-rendering the component here, not when changing the value of currentLow and currentHigh, hence the useRef
    setCurrentGuess(nextGuess);
    //setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextGuess, ...curPastGuesses]);
  };

  let listContainerStyle = styles.listContainer;
  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  let gameControls = (
    // MEMO -- Fragments let you group a list of children without adding extra nodes to the DOM
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
    </React.Fragment>
  );

  if (availableDeviceHeight < 500) {
    gameControls = (
      <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's guess</BodyText>
      {gameControls}
      <View style={styles.listContainer}>
        {/* MEMO -- layout property prepared for FlatList and ScrollView */}
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItems(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  list: {
    // MEMO -- flexGrow is more flexible than flex, usually used for ScrollView
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listContainer: {
    // MEMO -- scrollview does not work on android without setting flex
    flex: 1,
    width: "80%",
  },
  listContainerBig: {
    width: "60%",
  },
  listItem: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "60%",
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});
