import { COLORS } from "@/design/tokens";
import { useTray } from "@/hooks/use-tray";
import type { IPayWithView } from "@/interface/tray-screens.interface";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { XLogoIcon } from "../ui/svg/x-logo";
import { SheetHeader } from "./boost-shared";

export default function PayWithView({
  options,
  selectedValue,
  onSelect,
}: IPayWithView) {
  const { goBack } = useTray();

  const select = (value: string) => {
    onSelect(value);
    goBack();
  };

  return (
    <View style={{}}>
      <SheetHeader title="Pay With" onBack={goBack} />

      <View style={styles.list}>
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => select(option.value)}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            {option.value === "apple" ?
              <SymbolView
                name="apple.logo"
                tintColor={COLORS.FOREGROUND}
                size={22}
              />
            : <XLogoIcon size={19} color={COLORS.FOREGROUND} />}
            <Text style={styles.label}>Pay with {option.label}</Text>
            {option.value === selectedValue ?
              <SymbolView
                name="checkmark"
                tintColor={COLORS.FOREGROUND}
                size={13}
              />
            : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 200 },
  list: { marginTop: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
  },
  pressed: { opacity: 0.6 },
  label: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.FOREGROUND,
  },
});
