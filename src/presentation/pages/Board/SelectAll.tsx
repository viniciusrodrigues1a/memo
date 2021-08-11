import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CheckImg = require("../../assets/check.png");

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
        <View
          style={[
            styles.box,
            { backgroundColor: hasSelectedAllItems ? "white" : "transparent" },
          ]}
        >
          {hasSelectedAllItems && <Image source={CheckImg} />}
        </View>

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
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#dddddd",
    justifyContent: "center",
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
