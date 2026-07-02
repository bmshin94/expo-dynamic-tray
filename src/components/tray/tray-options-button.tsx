import { PressableScale } from "@/components/pressable-scale";
import { TRAY_COLORS } from "@/design/tray";
import type { ITrayOptionsButton } from "@/interface/tray-ui.interface";
import { SymbolView } from "expo-symbols";
import { StyleSheet, Text } from "react-native";

const TrayOptionsButton: React.FC<ITrayOptionsButton> = ({
  title,
  icon,
  onPress,
  isDestructive,
}) => {
  return (
    <PressableScale
      style={[styles.option, isDestructive && styles.optionDestructive]}
      onPress={onPress}
    >
      <SymbolView
        name={icon}
        size={20}
        tintColor={isDestructive ? TRAY_COLORS.red500 : TRAY_COLORS.zinc400}
      />
      <Text
        style={[
          styles.optionText,
          isDestructive && styles.optionTextDestructive,
        ]}
      >
        {title}
      </Text>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  option: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: TRAY_COLORS.zinc50,
  },
  optionDestructive: {
    backgroundColor: TRAY_COLORS.red50,
  },
  optionText: {
    fontSize: 17,
    fontWeight: "500",
    color: TRAY_COLORS.zinc800,
  },
  optionTextDestructive: {
    color: TRAY_COLORS.red500,
  },
});

export { TrayOptionsButton };
