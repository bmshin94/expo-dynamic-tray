import React from "react";
import { StyleSheet, View } from "react-native";
import { IPostCardPrimaryActions } from "./interface";

const PostCardPrimaryActionsIcon: React.FC<IPostCardPrimaryActions> = ({
  children,
  style,
}: IPostCardPrimaryActions): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return (
    <View style={[styles.primaryActionsContainer, style]}>{children}</View>
  );
};

export { PostCardPrimaryActionsIcon };

const styles = StyleSheet.create({
  primaryActionsContainer: {},
});
