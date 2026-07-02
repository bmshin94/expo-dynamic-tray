import { PressableScale } from "@/components/pressable-scale";
import type { ITraySecondaryButton } from "@/interface/tray-ui.interface";
import { StyleSheet, Text } from "react-native";

const TraySecondaryButton: React.FC<ITraySecondaryButton> = ({
  children,
  onPress,
  backgroundColor,
  color,
}) => {
  return (
    <PressableScale
      style={[styles.secondary, { backgroundColor }]}
      onPress={onPress}
    >
      {typeof children === "string" ?
        <Text style={[styles.secondaryText, { color }]}>{children}</Text>
      : children}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  secondary: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    fontSize: 19,
    fontWeight: "600",
  },
});

export { TraySecondaryButton };
