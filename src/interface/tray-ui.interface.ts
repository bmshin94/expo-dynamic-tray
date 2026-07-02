import type { SymbolViewProps } from "expo-symbols";
import type { ReactNode } from "react";

interface ITrayCloseButton {
  onPress: () => void;
}

interface ITrayHeader {
  icon: ReactNode;
  title: string;
  description: string;
  onClose: () => void;
}

interface ITrayOptionsButton {
  title: string;
  icon: SymbolViewProps["name"];
  onPress: () => void;
  isDestructive?: boolean;
}

interface ITraySecondaryButton {
  children: ReactNode;
  onPress: () => void;
  backgroundColor: string;
  color: string;
}

export type {
  ITrayCloseButton,
  ITrayHeader,
  ITrayOptionsButton,
  ITraySecondaryButton,
};
