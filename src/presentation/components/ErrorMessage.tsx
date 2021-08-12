import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ErrorMessageProps = {
  onPress: () => void;
  description?: string;
};

ErrorMessage.defaultProps = {
  description: "Something went wrong",
};

export default function ErrorMessage({
  onPress,
  description,
}: ErrorMessageProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>An error occurred</Text>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.fakeButtonText}>Try again</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: "#7C1F06",
    letterSpacing: 0.75,
  },
  description: {
    fontSize: 18,
    color: "#444444",
    letterSpacing: 0.75,
    marginTop: 12,
  },
  fakeButtonText: {
    fontSize: 24,
    color: "#222222",
    letterSpacing: 0.75,
    textTransform: "uppercase",
    marginTop: 64,
  },
});
