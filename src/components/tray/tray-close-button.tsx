import { PressableScale } from "@/components/pressable-scale";
import { TRAY_COLORS } from "@/design/tray";
import type { ITrayCloseButton } from "@/interface/tray-ui.interface";
import { SymbolView } from "expo-symbols";
import { StyleSheet } from "react-native";

const TrayCloseButton: React.FC<ITrayCloseButton> = ({ onPress }) => {
  return (
    <PressableScale style={styles.close} onPress={onPress}>
      <SymbolView
        name="xmark"
        size={13}
        weight="bold"
        tintColor={TRAY_COLORS.zinc400}
      />
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  close: {
    height: 32,
    width: 32,
    borderRadius: 999,
    backgroundColor: TRAY_COLORS.zinc100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { TrayCloseButton };
