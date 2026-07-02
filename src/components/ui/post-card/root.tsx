import React from "react";
import { View } from "react-native";
import { PostCardContext } from "./ctx";
import type { IPostCardRoot } from "./interface";

const PostCardRoot: React.FC<React.PropsWithChildren<IPostCardRoot>> = ({
  children,
  id,
}: IPostCardRoot): React.ReactNode & React.JSX.Element & React.ReactElement => {
  return (
    <PostCardContext.Provider value={{ id }}>
      <View>{children}</View>
    </PostCardContext.Provider>
  );
};

export { PostCardRoot };
