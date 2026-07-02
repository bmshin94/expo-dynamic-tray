import type { SymbolViewProps } from "expo-symbols";

interface IPriceTier {
  value: string;
  impressions: string;
  price: string;
}

interface ISelectOption {
  label: string;
  value: string;
}

interface ISheetHeader {
  title: string;
  onClose?: () => void;
  onHelp?: () => void;
  onBack?: () => void;
}

interface ISelectRow {
  label: string;
  leadingSymbol?: SymbolViewProps["name"];
  selectedValue: string;
  options: ISelectOption[];
  onPress?: () => void;
}

interface IRegionView {
  options: ISelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

interface IPayWithView {
  options: ISelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export type {
  IPayWithView,
  IPriceTier,
  IRegionView,
  ISelectOption,
  ISelectRow,
  ISheetHeader,
};
