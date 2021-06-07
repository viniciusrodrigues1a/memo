import { registerRootComponent } from "expo";
import React from "react";
import StatusBar from "./components/StatusBar";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <StatusBar />
      <Home />
    </>
  );
}

registerRootComponent(App);
