import Toast from "react-native-root-toast";

export function showError(message: string): void {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    opacity: 1,
    backgroundColor: "#7C1F06",
    containerStyle: { paddingVertical: 20, width: "90%", marginTop: 32 },
    textStyle: { fontSize: 18 },
  });
}
