import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";

export default function App() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}

registerRootComponent(App);
