import {
  Easing,
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated";

const PRESSABLE_SCALE_SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  stiffness: 120,
  mass: 0.9,
};

const PRESSABLE_SCALE_TIMING_CONFIG: WithTimingConfig = {
  duration: 200,
  easing: Easing.bezier(0.26, 0.08, 0.25, 1),
};

type TypeofPressableScaleSpringConfig = typeof PRESSABLE_SCALE_SPRING_CONFIG;
export {
  PRESSABLE_SCALE_SPRING_CONFIG,
  PRESSABLE_SCALE_TIMING_CONFIG,
  type TypeofPressableScaleSpringConfig,
};
