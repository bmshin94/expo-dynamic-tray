import { COLORS } from "@/design/tokens";
import { useChirpFont } from "@/hooks/use-chrip-font";
import { isTextNode } from "@/utils/is-text-node";
import React from "react";
import { StyleSheet, Text } from "react-native";
import type { IPostCardSubtitle } from "./interface";

const PostCardSubtitle: React.FC<
  React.PropsWithChildren<IPostCardSubtitle>
> = ({
  children,
  style,
}: IPostCardSubtitle): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const { fontLoaded } = useChirpFont();

  return isTextNode(children) ?
      <>
        <Text style={[styles.subtitle]}>{children}</Text>
      </>
    : <>{children}</>;
};

export { PostCardSubtitle };

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: COLORS.MUTED_FOREGROUND,
  },
});
