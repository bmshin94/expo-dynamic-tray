import type {
  EasingFunctionFactory,
  SharedValue,
} from "react-native-reanimated";

interface IAnimatedClose {
  present: SharedValue<number>;
  onFinish: () => void;
  duration?: number;
  easing?: EasingFunctionFactory;
}

export type { IAnimatedClose };
