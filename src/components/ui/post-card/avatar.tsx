import React from "react";
import { Image, StyleSheet } from "react-native";
import type { IPostCardAvatar } from "./interface";

const PostCardAvatar: React.FC<IPostCardAvatar> = ({
  source,
}: IPostCardAvatar): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return <Image source={{ uri: source }} style={styles.avatar} />;
};

export { PostCardAvatar };

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
});
