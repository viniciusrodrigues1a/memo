import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

const PlusImg = require("../assets/plus.png");

type AddButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function AddButton({ onPress, style = {} }: AddButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={PlusImg} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#067C69",
    padding: 10,
    borderRadius: 9999,
    elevation: 12,
  },
});
