import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

const FrownImg = require("../assets/frown.png");

type EmptyFlatListProps = {
  buttonOnPress: () => void;
  buttonText: string;
  text: string;
  imageSource: ImageSourcePropType;
};

export default function EmptyFlatList({
  buttonOnPress,
  buttonText,
  text,
  imageSource,
}: EmptyFlatListProps) {
  return (
    <View style={styles.container}>
      <Image source={imageSource} width={180} height={180} />

      <View style={styles.textView}>
        <Text style={styles.text}>{text}</Text>

        <Image source={FrownImg} width={40} height={40} />
      </View>

      <TouchableOpacity style={styles.button} onPress={buttonOnPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
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
