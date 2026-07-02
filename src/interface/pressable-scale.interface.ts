import type { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { AnimatedStyle } from "react-native-reanimated";

interface IPressableScale {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  scaleTo?: number;
  animatedStyle?: AnimatedStyle<ViewStyle>;
}

export type { IPressableScale };
