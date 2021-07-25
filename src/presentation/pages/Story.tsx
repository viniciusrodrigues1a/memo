import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../routes/StackNavigation";
import { createStoryUseCase } from "../factories";

export default function Story() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const route = useRoute<RouteProp<StackParamList, "Story">>();
  const navigation = useNavigation();

  useEffect(() => {
    setTitle(route.params.story.title);
    setDescription(route.params.story.content);
  }, [route]);

  const focusInput = useCallback((inputRef) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, []);

  async function createStory() {
    if (!description || !title) {
      return;
    }

    await createStoryUseCase.create({
      title,
      content: description,
      status: route.params.status,
    });

    navigation.goBack();
  }

  async function handleConfirmation() {
    if (isTitleFocused) {
      await createStory();
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerWrapper,
          { flexDirection: isTitleFocused ? "column-reverse" : "row" },
        ]}
      >
        <TextInput
          ref={titleInputRef}
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#888888"
          onSubmitEditing={() => focusInput(descriptionInputRef)}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />

        <View style={[styles.header, { paddingLeft: isTitleFocused ? 24 : 0 }]}>
          <TouchableOpacity disabled={description === ""}>
            <Text
              onPress={() => {}}
              style={[
                styles.cancelText,
                {
                  color: "#067C69",
                  display: isTitleFocused ? "flex" : "none",
                },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={description === ""}>
            <Text
              onPress={handleConfirmation}
              style={[styles.okText, { color: "#067C69", fontWeight: "bold" }]}
            >
              {isTitleFocused ? "SAVE" : "MORE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    height: 72,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 24,
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
