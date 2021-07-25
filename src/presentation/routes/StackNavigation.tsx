import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Board as BoardType, Status, Story as StoryType } from "../../entities";

import Home from "../pages/Home";
import Board from "../pages/Board";
import CreateStory from "../pages/CreateStory";
import Story from "../pages/Story";

export type StoryDTO = {
  status: Status;
  story: StoryType;
};

export type StackParamList = {
  Home: undefined;
  Board: BoardType;
  CreateStory: {
    boardId: string;
    statusId: string;
  };
  Story: StoryDTO;
};

const Stack = createStackNavigator<StackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="CreateStory" component={CreateStory} />
      <Stack.Screen name="Story" component={Story} />
    </Stack.Navigator>
  );
}
