import "react-native-gesture-handler";
import "react-native-get-random-values";
import { registerRootComponent } from "expo";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import StatusBar from "./components/StatusBar";

import Routes from "./routes";

export default function App() {
  return (
    <>
      <StatusBar />
      <RootSiblingParent>
        <Routes />
      </RootSiblingParent>
    </>
  );
}

registerRootComponent(App);
