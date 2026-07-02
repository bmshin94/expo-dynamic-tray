import type { IDismissPanGesture } from "@/interface/dismiss-pan-gesture.interface";
import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { withSpring } from "react-native-reanimated";

const useDismissPanGesture = <T extends IDismissPanGesture>({
  closeThreshold,
  onDismiss,
  dragY,
  config,
  velocityThreshold = 1000,
}: T) => {
  return useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          dragY.value = Math.max(0, event.translationY);
        })
        .onEnd((event) => {
          if (
            event.translationY > closeThreshold ||
            event.velocityY > velocityThreshold
          ) {
            onDismiss();
          } else {
            dragY.value = withSpring(0, {
              ...config,
              velocity: event.velocityY,
            });
          }
        }),
    [dragY, onDismiss, closeThreshold, config, velocityThreshold],
  );
};

export { useDismissPanGesture };
