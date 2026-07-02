import { COLORS, SPACING } from "@/design/tokens";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import type { IPostCardDivider } from "./interface";

const PostCardDivider: React.FC<IPostCardDivider> = ({
  style,
  color,
}: IPostCardDivider): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return (
    <View style={styles.dividerContainer}>
      <View
        style={[
          styles.divider,
          color ?
            { backgroundColor: color }
          : {
              backgroundColor: COLORS.DISABLED_FOREGROUND,
            },
        ]}
      />
    </View>
  );
};

export { PostCardDivider };

const styles = StyleSheet.create({
  divider: {
    height: 0.3,
    width: Dimensions.get("window").width,
    borderWidth: 0.3,
  },
  dividerContainer: {
    paddingTop: SPACING.MD,
  },
});
