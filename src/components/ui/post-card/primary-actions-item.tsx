import React from "react";
import { StyleSheet, View } from "react-native";
import { IPostCardPrimaryActionsItem } from "./interface";

const PostCardPrimaryActionsItem: React.FC<IPostCardPrimaryActionsItem> = ({
  children,
  style,
}: IPostCardPrimaryActionsItem): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return (
    <View style={[styles.primaryActionsContainer, style]}>{children}</View>
  );
};

export { PostCardPrimaryActionsItem };

const styles = StyleSheet.create({
  primaryActionsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
