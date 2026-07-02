import React from "react";
import { StyleSheet, View } from "react-native";
import { IPostCardPrimaryActionsContainer } from "./interface";

const PostCardPrimaryActionsContainer: React.FC<
  IPostCardPrimaryActionsContainer
> = ({
  children,
}: IPostCardPrimaryActionsContainer): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return <View style={[styles.primaryActionsContainer]}>{children}</View>;
};

export { PostCardPrimaryActionsContainer };

const styles = StyleSheet.create({
  primaryActionsContainer: {
    flexDirection: "row",
  },
});
