import type { SharedValue } from "react-native-reanimated";

interface IStickyKeyboardOffset {
  keyboardHeight: SharedValue<number>;
  screenHeight: number;
  topInset: number;
  extraOffset?: number;
}

export type { IStickyKeyboardOffset };
