import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Board as BoardType } from "../../entities";

import Home from "../pages/Home";
import Board from "../pages/Board";

export type StackParamList = {
  Home: undefined;
  Board: BoardType;
};

const Stack = createStackNavigator<StackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Board" component={Board} />
    </Stack.Navigator>
  );
}
