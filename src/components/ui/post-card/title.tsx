import { isTextNode } from "@/utils/is-text-node";
import React from "react";
import { StyleSheet, Text } from "react-native";
import type { IPostCardTitle } from "./interface";

const PostCardTitle: React.FC<React.PropsWithChildren<IPostCardTitle>> = ({
  children,
  style,
}: IPostCardTitle): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  // const { fontLoaded } = useChirpFont();

  return isTextNode(children) ?
      <>
        <Text style={[styles.title, style]}>{children}</Text>
      </>
    : <>{children}</>;
};

export { PostCardTitle };

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
