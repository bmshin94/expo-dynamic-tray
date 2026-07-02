import type { VideoPlayer } from "expo-video";
import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface IPostCardContext {
  id?: string;
}

interface IPostCardRoot {
  children: React.ReactNode;
  id?: string;
}

interface IPostCardHeader {
  children: React.ReactNode;
}

interface IPostCardContainer {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
interface IPostCardAvatar {
  source: string;
}

interface IPostCardActionRow {
  views: string;
  date: Date;
  time: string;
  style?: StyleProp<ViewStyle>;
}

interface IPostCardPrimaryActionsItem {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface IPostCardPrimaryActions {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  forceSpaceBetween?: boolean;
}
interface IPostCardPrimaryActionsContainer {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface IPostCardTitle {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}
interface IPostCardSubtitle {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

interface IPostCardDivider {
  style?: StyleProp<ViewStyle>;
  color?: string;
}

interface IPostCardContent {
  children: React.ReactNode;
}

interface IPostCardVideo {
  player: VideoPlayer;
}

export type {
  IPostCardActionRow,
  IPostCardAvatar,
  IPostCardContainer,
  IPostCardContent,
  IPostCardContext,
  IPostCardDivider,
  IPostCardHeader,
  IPostCardPrimaryActions,
  IPostCardPrimaryActionsContainer,
  IPostCardPrimaryActionsItem,
  IPostCardRoot,
  IPostCardSubtitle,
  IPostCardTitle,
  IPostCardVideo,
};
