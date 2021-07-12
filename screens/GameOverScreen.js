import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import { BodyText, MainButton, TitleText } from "../components";
import { Colors } from "../constants/Colors";

const window = Dimensions.get("window");

export const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={300}
            source={require("../assets/success.png")}
            // MEMO -- width and height has to be set for network image
            // source={{
            //   uri: "https://pixabay.com/photos/mountain-summit-summit-mountain-1375015/",
            // }}
            style={styles.image}
            //cover is default
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          {/* MEMO -- Text component can be nested! Style is also inherited!!! Text has its own layout styling instead of flexbox */}
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    color: Colors.primary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: (window.width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    // when a child component has a relative width of less than 100%, its parent component can not use the width of its child.
    width: window.width * 0.7,
    height: window.width * 0.7,
    //crop anything overflows the container
    overflow: "hidden",
    //height / 20 sets the vertical margin to 5% of the device height
    marginVertical: window.height / 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: window.height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: window.height < 400 ? 16 : 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
