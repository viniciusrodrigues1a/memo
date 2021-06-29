import React, { useState, useRef, useCallback } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { StackParamList } from "../routes/StackNavigation";

import { createStoryUseCase } from "../factories";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const descriptionInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamList, "CreateStory">>();

  async function createStory() {
    if (!description || !title) {
      return;
    }

    await createStoryUseCase.create({
      title,
      content: description,
      status: route.params,
    });

    navigation.goBack();
  }

  const focusDescriptionInput = useCallback(() => {
    if (!descriptionInputRef.current) {
      return;
    }

    descriptionInputRef.current.focus();
  }, [descriptionInputRef]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={description === ""}>
          <Text
            onPress={createStory}
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
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Title of your new task"
        placeholderTextColor="#888888"
      />

      <View style={styles.separator} />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.inputButtonWrapper}
        onPress={focusDescriptionInput}
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
