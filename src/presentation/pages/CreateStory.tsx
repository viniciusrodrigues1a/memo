import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function CreateStory() {
  const [description, setDescription] = useState("");
  const textInputRef = useRef<any>(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={description === ""}>
          <Text
            style={[
              styles.okText,
              { color: description === "" ? "#bbbbbb" : "#067C69" },
            ]}
          >
            Ok
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.inputButtonWrapper}
        onPress={() => textInputRef.current.focus()}
      >
        <TextInput
          ref={textInputRef}
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Type in the details of your new task..."
          placeholderTextColor="#999999"
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
  input: {
    fontSize: 16,
    padding: 24,
    color: "#222222",
  },
});
