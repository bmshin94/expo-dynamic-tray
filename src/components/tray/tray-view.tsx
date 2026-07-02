import type { ITrayView } from "@/interface/tray.interface";
import { Fragment } from "react";

const TrayView: React.FC<ITrayView> & React.FunctionComponent<ITrayView> = ({
  children,
}: ITrayView & React.ComponentProps<typeof TrayView>): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  return <Fragment>{children}</Fragment>;
};

export { TrayView };
