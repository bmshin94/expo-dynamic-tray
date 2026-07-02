import type { SharedValue, WithSpringConfig } from "react-native-reanimated";

interface ITrayLifeCycle {
  visible: boolean;
  present: SharedValue<number>;
  onClose: () => void;
  config: WithSpringConfig;
}

export type { ITrayLifeCycle };
