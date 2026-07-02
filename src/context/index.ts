import { ITrayContextValue } from "@/interface/tray-context.interface";
import { createContext } from "react";

const TrayContext = createContext<ITrayContextValue | null>(null);

export { TrayContext };
