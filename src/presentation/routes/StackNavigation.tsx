import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/Home";
import Board from "../pages/Board";

type StackParamList = {
  Home: undefined;
  Board: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Board" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Board" component={Board} />
    </Stack.Navigator>
  );
}
