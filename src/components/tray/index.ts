import { TrayContent } from "./tray-content";
import { TrayRoot } from "./tray-root";
import { TrayTrigger } from "./tray-trigger";
import { TrayView } from "./tray-view";

const Tray = Object.assign(TrayRoot, {
  Trigger: TrayTrigger,
  Content: TrayContent,
  View: TrayView,
});

export { useTray } from "@/hooks/use-tray";
export type {
  ITrayContent,
  ITrayRoot,
  ITrayTrigger,
  ITrayView,
} from "@/interface/tray.interface";
export { TrayCloseButton } from "./tray-close-button";
export { TrayHandle } from "./tray-handle";
export { TrayHeader } from "./tray-header";
export { TrayOptionsButton } from "./tray-options-button";
export { TraySecondaryButton } from "./tray-secondary-button";
export { Tray };
