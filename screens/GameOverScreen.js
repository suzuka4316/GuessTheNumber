import React, { useState, useEffect } from "react";
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

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            ...{
              width: availableDeviceWidth * 0.7,
              height: availableDeviceWidth * 0.7,
              borderRadius: (availableDeviceWidth * 0.7) / 2,
              //height / 20 sets the vertical margin to 5% of the device height
              marginVertical: availableDeviceHeight / 30,
            },
          }}
        >
          <Image
            style={styles.image}
            fadeDuration={300}
            source={require("../assets/success.png")}
            // MEMO -- width and height has to be set for network image
            // source={{
            //   uri: "https://pixabay.com/photos/mountain-summit-summit-mountain-1375015/",
            // }}
            //cover is default
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.resultContainer,
            ...{ marginVertical: availableDeviceHeight / 60 },
          }}
        >
          {/* MEMO -- Text component can be nested! Style is also inherited!!! Text has its own layout styling instead of flexbox */}
          <BodyText
            style={{
              ...styles.resultText,
              ...{ fontSize: window.height < 400 ? 16 : 20 },
            }}
          >
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
    borderWidth: 3,
    borderColor: "black",
    //crop anything overflows the container
    overflow: "hidden",
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
