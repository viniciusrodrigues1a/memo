import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import {
  useNavigation,
  useIsFocused,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackParamList } from "../routes/StackNavigation";

import { ServicesContext } from "../contexts";
import { showError } from "../utils/toasts";

export default function CreateStory() {
  const { createStoryService } = useContext(ServicesContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<StackParamList, "CreateStory">>();

  const focusInput = useCallback((inputRef) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isFocused) {
      focusInput(titleInputRef);
    }
  }, [isFocused, focusInput]);

  async function createStory() {
    setIsButtonDisabled(true);
    if (!description || !title) {
      return;
    }

    const response = await createStoryService.handle({
      title,
      content: description,
      statusId: route.params.statusId,
    });

    if (response.error) {
      showError(response.errorMessage!);
      setIsButtonDisabled(false);
      return;
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!description || !title || isButtonDisabled}
          onPress={createStory}
        >
          <Text
            style={[
              styles.okText,
              { color: !description || !title ? "#bbbbbb" : "#067C69" },
            ]}
          >
            Ok
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        ref={titleInputRef}
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Title of your new task"
        placeholderTextColor="#888888"
        onSubmitEditing={() => focusInput(descriptionInputRef)}
      />

      <View style={styles.separator} />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.inputButtonWrapper}
        onPress={() => focusInput(descriptionInputRef)}
      >
        <TextInput
          ref={descriptionInputRef}
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Type in the details of your new task..."
          placeholderTextColor="#aaaaaa"
          multiline
          autoFocus
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 72,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 20,
    color: "#067C69",
  },
  okText: {
    fontSize: 20,
    color: "#067C69",
    textTransform: "uppercase",
  },
  inputButtonWrapper: {
    height: "100%",
  },
  titleInput: {
    padding: 24,
    color: "#111111",
    fontSize: 16,
  },
  separator: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: "#aaaaaa",
  },
  descriptionInput: {
    padding: 24,
    color: "#666666",
    fontSize: 14,
  },
});
