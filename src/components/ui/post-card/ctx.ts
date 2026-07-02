import { createContext } from "react";
import type { IPostCardContext } from "./interface";

const PostCardContext = createContext<IPostCardContext | null>(null);

export { PostCardContext };
