import { COLORS } from "@/design/tokens";
import { GlassView } from "expo-glass-effect";
import React, { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

export const GlassButton: React.FC<
  React.PropsWithChildren<{ onPress?: () => void }>
> = memo(
  ({
    children,
    onPress,
  }: React.PropsWithChildren<{ onPress?: () => void }>): React.ReactNode &
    React.JSX.Element => {
    return (
      <Pressable onPress={onPress}>
        <GlassView
          style={styles.container}
          glassEffectStyle={{
            animate: true,
            style: "clear",
          }}
          isInteractive
          tintColor={COLORS.PRIMARY_FOREGROUND}
        >
          {children}
        </GlassView>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});
