import {
  withTiming,
  type SharedValue,
  type WithTimingConfig,
} from "react-native-reanimated";

function animated<T extends SharedValue<number>>(sharedValue: T) {
  return Object.assign(sharedValue, {
    timing: (toValue: number, config?: WithTimingConfig) => {
      sharedValue.value = withTiming(toValue, config);
    },
  });
}

export { animated };
