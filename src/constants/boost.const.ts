import type {
  IPriceTier,
  ISelectOption,
} from "@/interface/tray-screens.interface";

const TIERS: IPriceTier[] = [
  { value: "1", impressions: "692 – 1.1K impressions", price: "$1" },
  { value: "10", impressions: "6.4K – 12K impressions", price: "$10" },
  { value: "25", impressions: "15K – 30K impressions", price: "$25" },
  { value: "50", impressions: "30K – 60K impressions", price: "$50" },
  { value: "100", impressions: "60K – 119K impressions", price: "$100" },
];

const REGIONS: ISelectOption[] = [
  { label: "Global", value: "global" },
  { label: "United Kingdom", value: "uk" },
  { label: "United States", value: "us" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Spain", value: "es" },
  { label: "Italy", value: "it" },
  { label: "Japan", value: "jp" },
  { label: "India", value: "in" },
  { label: "Brazil", value: "br" },
  { label: "Australia", value: "au" },
  { label: "Canada", value: "ca" },
];

const PAYMENTS: ISelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "X Money", value: "x" },
];

export { PAYMENTS, REGIONS, TIERS };
