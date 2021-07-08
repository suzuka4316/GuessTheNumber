import React from "react";
import { StyleSheet, View } from "react-native";

export const Card = (props) => {
  // MEMO -- To assign/override certain unique styles from outside Card component, you can use spead operator
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    // MEMO -- shadow property only works on ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // MEMO -- use elevation for android (less control than shadow)
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
