import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface ITrayRoot {
  children: ReactNode;
  defaultView?: string;
  closeThreshold?: number;
}

interface ITrayTrigger {
  children: ReactNode;
  view?: string;
  style?: StyleProp<ViewStyle>;
  asChild?: boolean;
}

interface ITrayView {
  id: string;
  children: ReactNode;
  footer?: ReactNode;
  hideFooter?: boolean;
}

interface ITrayContent {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export type { ITrayContent, ITrayRoot, ITrayTrigger, ITrayView };
