import { isTextNode } from "@/utils/is-text-node";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import type { IPostCardContent } from "./interface";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderContent(text: string) {
  return text.split(URL_REGEX).map((part, index) => {
    const isLink = /^https?:\/\/[^\s]+$/.test(part);

    if (isLink) {
      return (
        <Text
          key={index}
          style={styles.link}
          suppressHighlighting
          onPress={() => Linking.openURL(part)}
        >
          {part}
        </Text>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

const PostCardContent: React.FC<React.PropsWithChildren<IPostCardContent>> = ({
  children,
}) => {
  if (!isTextNode(children)) {
    return <>{children}</>;
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title]} numberOfLines={3}>
        {renderContent(String(children))}
      </Text>
    </View>
  );
};

export { PostCardContent };

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 18,
  },
  title: {
    fontSize: 18,
    color: "white",
    maxWidth: "90%",
  },
  link: {
    color: "#4DA3FF",
  },
});
