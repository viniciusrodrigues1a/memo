import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SelectedItem } from "./SelectedItem";

type SelectAllProps = {
  count: number;
  countLimit: number;
  onSelectAll?: () => void;
};

SelectAll.defaultProps = {
  onSelectAll: () => {},
};

export function SelectAll({ count, onSelectAll, countLimit }: SelectAllProps) {
  const hasSelectedAllItems = useMemo(
    () => count === countLimit,
    [count, countLimit]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onSelectAll}>
      <View style={styles.boxWrapper}>
        <SelectedItem checked={hasSelectedAllItems} theme="light" />

        <Text style={styles.text}>All</Text>
      </View>

      <Text style={styles.count}>{count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  boxWrapper: {
    alignItems: "center",
  },
  text: {
    color: "#dddddd",
    fontSize: 16,
    marginTop: 4,
  },
  count: {
    color: "#dddddd",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
});
