import type {
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated";

interface IAnimatedSharedValue<T extends number> extends SharedValue<T> {
  spring(value: T, config?: WithSpringConfig): void;
  timing(value: T, config?: WithTimingConfig): void;
}

export type { IAnimatedSharedValue };
