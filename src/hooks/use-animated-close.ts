import type { IAnimatedClose } from "@/interface/animated-close.interface";
import { useCallback } from "react";
import { withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const useAnimatedClose = <T extends IAnimatedClose>({
  onFinish,
  present,
  duration,
  easing,
}: T) => {
  return useCallback(() => {
    "worklet";

    present.value = withTiming(
      0,
      {
        duration,
        easing,
      },
      (finished) => {
        if (finished) {
          scheduleOnRN(onFinish);
        }
      },
    );
  }, [present, onFinish, duration, easing]);
};

export { useAnimatedClose };
