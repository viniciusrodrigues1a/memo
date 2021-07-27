import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Story } from "../../../entities";

type CardProps = {
  story: Story;
};

export function Card({ story }: CardProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Story", story)}
    >
      <Text style={styles.title}>{story.title}</Text>

      <Text style={styles.content}>{story.content}</Text>

      <Text style={styles.expirationDate}>Vence em 4 dias</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    margin: 16,
    padding: 24,
    borderRadius: 4,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    color: "#222222",
  },
  content: {
    fontSize: 16,
    color: "#666666",
    marginTop: 16,
  },
  expirationDate: {
    marginTop: 42,
    fontSize: 14,
    color: "#888888",
  },
});
