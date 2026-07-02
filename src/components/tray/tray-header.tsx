import { TRAY_COLORS } from "@/design/tray";
import type { ITrayHeader } from "@/interface/tray-ui.interface";
import { StyleSheet, Text, View } from "react-native";
import { TrayCloseButton } from "./tray-close-button";

const TrayHeader: React.FC<ITrayHeader> = ({
  icon,
  title,
  description,
  onClose,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        {icon}
        <TrayCloseButton onPress={onClose} />
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 21,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "600",
    color: TRAY_COLORS.ink,
  },
  headerDescription: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 24,
    color: TRAY_COLORS.muted,
  },
});

export { TrayHeader };
