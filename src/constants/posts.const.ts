import { Image } from "react-native";

interface IAttachments {
  type: "image" | "video";
  readonly url: string;
}
interface IComments {
  id: string;
  avatar: string;
  displayName: string;
  isVerified: boolean;
  likesCount: number;
  content: string;
  username: string;
  date: string;
}

interface IPostContent {
  content: string;
  displayName: string;
  username: string;
  avatar: string;
  views: string;
  commentCount: number;
  retweetCount: number;
  likesCount: number;
  bookmarks: number;
  createdAt: Date;
  exactTime: string;
  isVerified?: boolean;
  attachments?: IAttachments[];
  comments?: IComments[];
}

const POST_CONTENT: IPostContent = {
  content: `✦ ⎯ • Smooth stackable toasts

Github: https://github.com/rit3zh/expo-dynamic-toast`,
  displayName: "rit3zh",
  username: "rit3zh",
  exactTime: "8:32 PM",
  avatar:
    "https://pbs.twimg.com/profile_images/2064564663019569152/5k4DbNsp.jpg",
  bookmarks: 319,
  commentCount: 8,
  isVerified: true,
  retweetCount: 13,
  likesCount: 328,
  createdAt: new Date("2026-06-25T20:32:00.000Z"),
  views: "16K",
  attachments: [
    {
      type: "video",
      url: Image.resolveAssetSource(
        require("@/assets/videos/toast-dynamic.mp4"),
      ).uri,
    },
  ],
  comments: [
    {
      displayName: "Ananya", // ❤️
      avatar:
        "https://i.pinimg.com/736x/03/d6/12/03d612a4bf78164f672be311fefe643f.jpg",
      id: "1",
      isVerified: true,
      likesCount: 12,
      content: `Love the smooth stackable toasts! The animations are so fluid and the design is sleek. Great work!`,
      username: "ananya",
      date: "2d",
    },
    {
      displayName: "Elias",
      avatar:
        "https://i.pinimg.com/736x/e7/cf/8f/e7cf8fb335799451022f72210a6e691a.jpg",
      id: "2",
      isVerified: true,
      likesCount: 3,
      content: `Oh, I just tried it out and I'm impressed! The toasts are not only functional but also visually appealing. Keep it up!`,
      date: "3d",
      username: "eliascx",
    },
    {
      displayName: "Zack",
      avatar:
        "https://i.pinimg.com/736x/7b/05/ab/7b05ab36dade41c382ff01df40bf1d0f.jpg",
      id: "3",
      isVerified: true,
      likesCount: 3,
      content: `Using it in my project now, and it's a game-changer!`,
      date: "4d",
      username: "zackp",
    },
  ],
};

export { POST_CONTENT };
export type { IAttachments, IPostContent };
