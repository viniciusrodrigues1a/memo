import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const arrowLeftImg = require("../../assets/arrow-left.png");
const searchImg = require("../../assets/search.png");

type SearchingHeaderProps = {
  onDebouncedEditing: (searchValue: string) => void;
  onCancel: () => void;
};

let debounceTimeout;
export function SearchingHeader({
  onDebouncedEditing,
  onCancel,
}: SearchingHeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  const focusInput = useCallback(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  }, []);

  function handleTextChange(e: string) {
    setSearchValue(e);
    resetDebounceTimeout(e);
  }

  function resetDebounceTimeout(e: string) {
    clearDebounceTimeout();
    callFunctionPropFromNewTimeout(e);
  }

  function clearDebounceTimeout() {
    clearTimeout(debounceTimeout);
    debounceTimeout = null;
  }

  function callFunctionPropFromNewTimeout(e: string) {
    debounceTimeout = setTimeout(() => {
      onDebouncedEditing(e);
    }, 50);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <Image source={arrowLeftImg} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={styles.inputContainer}>
          <Image source={searchImg} />

          <TextInput
            ref={inputRef}
            style={styles.input}
            value={searchValue}
            onChangeText={handleTextChange}
            placeholder="Search"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    backgroundColor: "#dddddd",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    padding: 12,
  },
  input: {
    marginLeft: 10,
    width: "65%",
    alignSelf: "stretch",
    marginBottom: -2,
  },
});
