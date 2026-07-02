import { COLORS } from "@/design/tokens";
import { useChirpFont } from "@/hooks/use-chrip-font";
import { isTextNode } from "@/utils/is-text-node";
import React from "react";
import { StyleSheet, Text } from "react-native";
import type { IPostCardTitle } from "./interface";

const PostCardPrimaryActionsLabel: React.FC<
  React.PropsWithChildren<IPostCardTitle>
> = ({
  children,
  style,
}: IPostCardTitle): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const { fontLoaded } = useChirpFont();

  return isTextNode(children) ?
      <>
        <Text style={[styles.title, style]}>{children}</Text>
      </>
    : <>{children}</>;
};

export { PostCardPrimaryActionsLabel };

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: COLORS.MUTED_FOREGROUND,
  },
});
