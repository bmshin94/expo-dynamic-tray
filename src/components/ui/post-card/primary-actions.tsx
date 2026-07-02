import { SPACING } from "@/design/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IPostCardPrimaryActions } from "./interface";

const PostCardPrimaryActions: React.FC<IPostCardPrimaryActions> = ({
  children,
  forceSpaceBetween,
  style,
}: IPostCardPrimaryActions): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return (
    <View style={[styles.primaryActionsCoreContainer]}>
      <View
        style={[
          forceSpaceBetween ?
            styles.spaceBetweenContainer
          : styles.primaryActionsContainer,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export { PostCardPrimaryActions };

const styles = StyleSheet.create({
  primaryActionsCoreContainer: {
    left: SPACING.XS,
  },
  primaryActionsContainer: {
    flexDirection: "row",
    paddingTop: 16,

    alignItems: "center",
    gap: 36,
  },
  spaceBetweenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 26,
  },
});
