import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const TitleText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
