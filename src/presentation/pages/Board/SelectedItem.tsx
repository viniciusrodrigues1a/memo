import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";

const CheckGreenImg = require("../../assets/check-green.png");
const CheckWhiteImg = require("../../assets/check-white.png");

type SelectedItemProps = {
  checked?: boolean;
  theme?: "light" | "dark";
};

SelectedItem.defaultProps = {
  checked: false,
  theme: "dark",
};

const themeColors = {
  dark: {
    backgroundColor: "#37067C",
    checkImg: CheckWhiteImg,
    borderColor: "#666666",
  },
  light: {
    backgroundColor: "#dddddd",
    checkImg: CheckGreenImg,
    borderColor: "#dddddd",
  },
};

export function SelectedItem({
  checked = false,
  theme = "dark",
}: SelectedItemProps) {
  const colors = useMemo(() => themeColors[theme], [theme]);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: checked ? colors.backgroundColor : "transparent",
          borderColor: colors.borderColor,
        },
      ]}
    >
      {checked && <Image source={colors.checkImg} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
