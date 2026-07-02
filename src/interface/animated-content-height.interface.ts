import type { SharedValue, WithSpringConfig } from "react-native-reanimated";

interface IAnimatedHeightContent {
  height: SharedValue<number>;
  config: WithSpringConfig;
}

export type { IAnimatedHeightContent };
