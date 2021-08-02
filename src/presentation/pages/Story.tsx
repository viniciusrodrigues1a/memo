import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
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
import { ServicesContext } from "../contexts";
import { showError } from "../utils/toasts";

export default function Story() {
  const { updateStoryService } = useContext(ServicesContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const route = useRoute<RouteProp<StackParamList, "Story">>();
  const navigation = useNavigation();

  useEffect(() => {
    setTitle(route.params.title);
    setDescription(route.params.content);
  }, [route]);

  const focusInput = useCallback((inputRef) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, []);

  async function updateStory() {
    if (!description || !title) {
      return;
    }

    const response = await updateStoryService.handle({
      title,
      content: description,
      storyId: route.params.id,
    });

    if (response.error) {
      showError(response.errorMessage!);
      return;
    }

    navigation.goBack();
  }

  function closeHeaderMenu() {
    titleInputRef.current?.blur();
    descriptionInputRef.current?.blur();
    setIsEditing(false);
  }

  async function handleConfirmation() {
    if (isEditing) {
      await updateStory();
    }
  }

  function handleInputFocusedStateOnBlur() {
    if (
      !titleInputRef.current?.isFocused() &&
      !descriptionInputRef.current?.isFocused()
    ) {
      setIsEditing(false);
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerWrapper,
          { flexDirection: isEditing ? "column-reverse" : "row" },
        ]}
      >
        <TextInput
          ref={titleInputRef}
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#888888"
          onSubmitEditing={() => focusInput(descriptionInputRef)}
          onFocus={() => setIsEditing(true)}
          onBlur={handleInputFocusedStateOnBlur}
        />

        <View style={[styles.header, { paddingLeft: isEditing ? 24 : 0 }]}>
          <TouchableOpacity disabled={description === ""}>
            <Text
              onPress={closeHeaderMenu}
              style={[
                styles.cancelText,
                {
                  color: "#067C69",
                  display: isEditing ? "flex" : "none",
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
              {isEditing ? "SAVE" : "MORE"}
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
          onFocus={() => setIsEditing(true)}
          onBlur={handleInputFocusedStateOnBlur}
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
