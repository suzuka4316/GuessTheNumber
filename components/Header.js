import React from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "../constants/Colors";
import { TitleText } from "./";

export const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    // paddingTop: 36,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
  },
});
