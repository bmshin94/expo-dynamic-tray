import { TrayContext } from "@/context";
import { useContext } from "react";

const useTray = () => {
  const context = useContext(TrayContext);
  if (!context) {
    throw new Error("Tray.* components must be rendered within <Tray>.");
  }
  return context;
};

export { useTray };
