import {
  PRESSABLE_SCALE_SPRING_CONFIG,
  PRESSABLE_SCALE_TIMING_CONFIG,
} from "@/constants/pressable.const";
import type { IAnimatedSharedValue } from "@/interface/animated-shared-value.interface";
import {
  withSpring,
  withTiming,
  WithTimingConfig,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";

function animated<T extends number>(
  sv: SharedValue<T>,
): IAnimatedSharedValue<T> {
  return Object.assign(sv, {
    spring(value: T, config?: WithSpringConfig) {
      "worklet";
      sv.value = withSpring(
        value,
        !config ? PRESSABLE_SCALE_SPRING_CONFIG : config,
      );
    },
    timing(value: T, config?: WithTimingConfig) {
      "worklet";
      sv.value = withTiming(
        value,
        !config ? PRESSABLE_SCALE_TIMING_CONFIG : config,
      );
    },
  });
}
export { animated };
