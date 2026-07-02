import type { EasingFunctionFactory } from "react-native-reanimated";

interface IScaleFadeTransition {
  fromOpacity: number;
  toOpacity: number;
  fromScale: number;
  toScale: number;
  duration?: number;
  delay?: number;
  easing: EasingFunctionFactory;
}

export type { IScaleFadeTransition };
