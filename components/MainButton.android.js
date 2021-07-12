import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { Colors } from "../constants/Colors";

const MainButton = (props) => {
  // MEMO -- notice that the variable ButtonComponent starts with capital letter so that it would be used as a component
  let ButtonComponent = TouchableOpacity;
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
