import { TRAY_COLORS } from "@/design/tray";
import React from "react";
import { StyleSheet, View } from "react-native";

const TrayHandle: React.FC = (): React.ReactNode => {
  return <View style={styles.handle} />;
};

const styles = StyleSheet.create({
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: TRAY_COLORS.zinc400,
  },
});

export { TrayHandle };
