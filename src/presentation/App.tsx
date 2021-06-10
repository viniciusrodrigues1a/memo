import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import StatusBar from "./components/StatusBar";

import Routes from "./routes";

export default function App() {
  return (
    <>
      <StatusBar />
      <Routes />
    </>
  );
}

registerRootComponent(App);
