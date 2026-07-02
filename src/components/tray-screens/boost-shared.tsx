import { PressableScale } from "@/components/pressable-scale";
import { MatchedText } from "@/components/ui/swiftui/matched-text";
import { COLORS } from "@/design/tokens";
import { useTray } from "@/hooks/use-tray";
import type {
  ISelectRow,
  ISheetHeader,
} from "@/interface/tray-screens.interface";
import { animated } from "@/utils/animated-value";
import { Host } from "@expo/ui/swift-ui";
import { SymbolView } from "expo-symbols";
import { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const BUTTON_WIDTH = 312;
const MIN_BUTTON_WIDTH = 160;
const CANCEL_WIDTH = 140;

function SheetHeader({ title, onClose, onHelp, onBack }: ISheetHeader) {
  return (
    <Fragment>
      <View style={styles.header}>
        {onBack ?
          <PressableScale style={styles.iconButton} onPress={onBack}>
            <SymbolView
              name="chevron.left"
              tintColor={COLORS.FOREGROUND}
              size={20}
            />
          </PressableScale>
        : <PressableScale style={styles.iconButton} onPress={onClose}>
            <SymbolView name="xmark" tintColor={COLORS.FOREGROUND} size={18} />
          </PressableScale>
        }
        <Text style={styles.headerTitle}>{title}</Text>
        {onBack ?
          <View style={styles.iconButton} />
        : <PressableScale style={styles.iconButton} onPress={onHelp}>
            <SymbolView
              name="questionmark.circle"
              tintColor={COLORS.FOREGROUND}
              size={22}
            />
          </PressableScale>
        }
      </View>
      <View style={styles.divider} />
    </Fragment>
  );
}

function SelectRow({
  label,
  leadingSymbol,
  selectedValue,
  options,
  onPress,
}: ISelectRow) {
  const selected = options.find((option) => option.value === selectedValue);
  return (
    <PressableScale onPress={onPress} style={styles.selectRow}>
      <Text style={styles.selectLabel}>{label}</Text>
      <View style={styles.selectValue}>
        {leadingSymbol ?
          <SymbolView
            name={leadingSymbol}
            tintColor={COLORS.FOREGROUND}
            size={18}
          />
        : null}
        <Text style={styles.selectValueText}>{selected?.label}</Text>
        <SymbolView
          name="chevron.right"
          tintColor={COLORS.MUTED_FOREGROUND}
          size={14}
        />
      </View>
    </PressableScale>
  );
}

function TrayFooterButton() {
  const { view, goBack } = useTray();
  const isInfo = view === "boost-info";

  const progress = animated(useSharedValue<number>(0));
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (isInfo) {
      progress.timing(0);
      setConfirming(false);
    }
  }, [isInfo, progress]);

  const label =
    isInfo ? "Got It"
    : confirming ? "Confirm"
    : "Boost Post";

  const primaryButtonStylez = useAnimatedStyle(() => ({
    width: interpolate(
      progress.value,
      [0, 1],
      [BUTTON_WIDTH, MIN_BUTTON_WIDTH],
    ),
  }));

  const destructiveButtonStylez = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.9, 1]) }],
  }));

  const handlePress = () => {
    if (isInfo) {
      goBack();
      return;
    }
    progress.timing(confirming ? 0 : 1);
    setConfirming((prev) => !prev);
  };

  return (
    <View style={styles.primaryRow}>
      <PressableScale
        onPress={handlePress}
        style={styles.destructiveButton}
        animatedStyle={destructiveButtonStylez}
      >
        <Text style={styles.destructiveLabel}>Cancel</Text>
      </PressableScale>
      <PressableScale
        onPress={handlePress}
        style={styles.primary}
        animatedStyle={primaryButtonStylez}
      >
        <Host
          matchContents={{ vertical: false, horizontal: true }}
          colorScheme="light"
        >
          <MatchedText texts={[label]} index={0} fontSize={17} />
        </Host>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.FOREGROUND,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.BORDER,
  },

  selectRow: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.SURFACE_ELEVATED,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.MUTED_FOREGROUND,
  },
  selectValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectValueText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.FOREGROUND,
  },

  primaryRow: {
    marginTop: 20,
    height: 45,
  },
  primary: {
    position: "absolute",
    right: 0,
    height: 45,
    borderRadius: 999,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  destructiveButton: {
    position: "absolute",
    left: 0,
    width: CANCEL_WIDTH,
    height: 45,
    borderRadius: 999,
    backgroundColor: COLORS.SURFACE_ELEVATED,
    alignItems: "center",
    justifyContent: "center",
  },
  destructiveLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.FOREGROUND,
  },
});

export { SelectRow, SheetHeader, TrayFooterButton };
