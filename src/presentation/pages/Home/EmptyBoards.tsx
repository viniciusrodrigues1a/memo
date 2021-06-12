import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const FrownImg = require("../../assets/frown.png");
const LayoutImg = require("../../assets/layout.png");

type EmptyBoardsProps = {
  buttonOnPress: () => void;
};

export default function EmptyBoards({ buttonOnPress }: EmptyBoardsProps) {
  return (
    <View style={styles.container}>
      <Image source={LayoutImg} width={180} height={180} />

      <View style={styles.textView}>
        <Text style={styles.text}>No board was found</Text>

        <Image source={FrownImg} width={40} height={40} />
      </View>

      <TouchableOpacity style={styles.button} onPress={buttonOnPress}>
        <Text style={styles.buttonText}>Create your first board</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 42,
  },
  text: {
    fontSize: 22,
    letterSpacing: 0.75,
    textAlign: "center",
    marginRight: 8,
    color: "#222222",
  },
  button: {
    backgroundColor: "#067C69",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 24,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 22,
    color: "#dddddd",
    letterSpacing: 0.75,
  },
});
