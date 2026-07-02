import { PAYMENTS, REGIONS, TIERS } from "@/constants/boost.const";
import { COLORS } from "@/design/tokens";
import { useTray } from "@/hooks/use-tray";
import {
  Host,
  HStack,
  Picker,
  Spacer,
  Text as SwiftText,
} from "@expo/ui/swift-ui";
import {
  font,
  foregroundStyle,
  padding,
  pickerStyle,
  tag,
} from "@expo/ui/swift-ui/modifiers";
import { StyleSheet, Text, View } from "react-native";
import { SelectRow, SheetHeader } from "./boost-shared";

interface IDefaultView {
  tier: string;
  onTierChange: (value: string) => void;
  region: string;
  payWith: string;
}

export default function DefaultView({
  tier,
  onTierChange,
  region,
  payWith,
}: IDefaultView) {
  const { close, setView } = useTray();

  return (
    <View>
      <SheetHeader
        title="Boost Post"
        onClose={close}
        onHelp={() => setView("boost-info")}
      />

      <Text style={styles.subtitle}>
        Get up to 3x more likes. <Text style={styles.link}>Learn more</Text>
      </Text>

      <Host style={styles.wheelHost} colorScheme="dark">
        <Picker
          modifiers={[pickerStyle("wheel")]}
          selection={tier}
          onSelectionChange={onTierChange}
        >
          {TIERS.map((t) => (
            <HStack key={t.value} modifiers={[tag(t.value)]}>
              <SwiftText
                modifiers={[
                  foregroundStyle(COLORS.FOREGROUND),
                  font({ size: 15, weight: "regular" }),
                  padding({ leading: 25, trailing: 8 }),
                ]}
              >
                {t.impressions}
              </SwiftText>
              <Spacer />
              <SwiftText
                modifiers={[
                  foregroundStyle(COLORS.FOREGROUND),
                  font({ size: 17, weight: "semibold" }),
                  padding({ trailing: 16 }),
                ]}
              >
                {t.price}
              </SwiftText>
            </HStack>
          ))}
        </Picker>
      </Host>

      <View style={styles.rows}>
        <SelectRow
          label="Region"
          selectedValue={region}
          options={REGIONS}
          onPress={() => setView("region")}
        />
        <SelectRow
          label="Pay with"
          leadingSymbol="apple.logo"
          selectedValue={payWith}
          onPress={() => setView("payWith")}
          options={PAYMENTS}
        />
      </View>

      <View style={styles.terms}>
        <Text style={styles.termsText}>
          By clicking the Boost Post button below, you agree to our
        </Text>
        <Text style={[styles.termsText, styles.termsLink]}>
          Terms and Conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.MUTED_FOREGROUND,
  },
  link: {
    color: COLORS.FOREGROUND,
    textDecorationLine: "underline",
  },

  wheelHost: {
    width: "100%",
    height: 190,
    marginTop: 12,
  },

  rows: {
    gap: 10,
  },

  terms: {
    marginTop: 20,
    alignItems: "center",
    gap: 2,
  },
  termsText: {
    fontSize: 11,
    textAlign: "center",
    color: COLORS.SUBTLE_FOREGROUND,
  },
  termsLink: {
    color: COLORS.MUTED_FOREGROUND,
    textDecorationLine: "underline",
  },
});
