import {
  VIEW_EASING,
  VIEW_ENTER_SCALE,
  VIEW_TRANSITION_DURATION,
} from "@/constants/tray.const";
import { useEffect } from "react";
import { type ViewStyle } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useViewLayerStyle = <T extends boolean>(active: T) => {
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withTiming<number>(active ? 1 : 0, {
      duration: VIEW_TRANSITION_DURATION,
      easing: VIEW_EASING,
    });
  }, [active, progress]);

  return useAnimatedStyle<Pick<ViewStyle, "opacity" | "transform">>(() => ({
    opacity: progress.value,
    transform: [
      { scale: interpolate(progress.value, [0, 1], [VIEW_ENTER_SCALE, 1]) },
    ],
  }));
};

export { useViewLayerStyle, VIEW_TRANSITION_DURATION };
