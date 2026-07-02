import { useContext } from "react";
import { PostCardContext } from "./ctx";
import type { IPostCardContext } from "./interface";

const usePostCardContext = (): Required<IPostCardContext> => {
  const context = useContext<IPostCardContext | null>(PostCardContext);

  if (!context)
    throw new Error(
      "<PostCard.Root> must be used within a <PostCard> component.",
    );
  return context as Required<IPostCardContext>;
};

export { usePostCardContext };
