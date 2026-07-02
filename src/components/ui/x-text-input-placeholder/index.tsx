import { COLORS } from "@/design/tokens";
import { NativeTabs } from "expo-router/build/native-tabs";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const TextInputPlaceHolder = memo(() => {
  const placement = NativeTabs.BottomAccessory.usePlacement();
  if (placement === "regular") {
    return (
      <View style={styles.textInputPlaceHolderContainer}>
        <Text style={styles.text}>Add another post</Text>
      </View>
    );
  }
  return <></>;
});

export { TextInputPlaceHolder };

const styles = StyleSheet.create({
  text: {
    color: COLORS.MUTED_FOREGROUND,
  },
  textInputPlaceHolderContainer: {
    padding: 15,
  },
});
