import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function StatusBar() {
  return (
    <>
      <View style={styles.statusBarContainer} />
      <ExpoStatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    height: Constants.statusBarHeight,
    backgroundColor: "#067C69",
  },
});
