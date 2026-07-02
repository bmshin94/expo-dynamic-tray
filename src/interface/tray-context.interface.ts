import type { LayoutChangeEvent } from "react-native";
import type { PanGesture } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";

interface ITrayContextValue {
  visible: boolean;
  view: string;
  setView: (view: string) => void;
  goBack: () => void;
  canGoBack: boolean;
  open: (view?: string) => void;
  close: () => void;
  height: SharedValue<number>;
  translateY: SharedValue<number>;
  overlay: SharedValue<number>;
  scale: SharedValue<number>;
  keyboardHeight: SharedValue<number>;
  onContentLayout: (event: LayoutChangeEvent) => void;
  pan: PanGesture;
}

export type { ITrayContextValue };
