import { IScaleFadeTransition } from "@/interface/scale-fade-transition.interface";
import {
  EntryExitAnimationFunction,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const createScaleFadeTransition = <T extends IScaleFadeTransition>({
  fromOpacity,
  toOpacity,
  fromScale,
  toScale,
  duration = 270,
  delay = 0,
  easing,
}: T): EntryExitAnimationFunction => {
  return () => {
    "worklet";

    return {
      initialValues: {
        opacity: fromOpacity,
        transform: [{ scale: fromScale }],
      },
      animations: {
        opacity: withDelay(
          delay,
          withTiming(toOpacity, {
            duration,
            easing,
          }),
        ),
        transform: [
          {
            scale: withDelay(
              delay,
              withTiming(toScale, {
                duration,
                easing,
              }),
            ),
          },
        ],
      },
    };
  };
};

export { createScaleFadeTransition };
