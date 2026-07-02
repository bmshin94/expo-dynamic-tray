import type { SharedValue, WithSpringConfig } from "react-native-reanimated";

interface IDismissPanGesture {
  dragY: SharedValue<number>;
  onDismiss: () => void;
  closeThreshold: number;
  config: WithSpringConfig;
  velocityThreshold?: number;
}
export type { IDismissPanGesture };
