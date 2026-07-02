import { PressableScale } from "@/components/pressable-scale/";
import { useTray } from "@/hooks/use-tray";
import type { ITrayTrigger } from "@/interface/tray.interface";
import type { ReactElement } from "react";
import { Children, cloneElement, useCallback } from "react";

const TrayTrigger: React.FC<ITrayTrigger> &
  React.FunctionComponent<ITrayTrigger> = ({
  children,
  view,
  style,
  asChild,
}: ITrayTrigger & React.ComponentProps<typeof TrayTrigger>): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const { open } = useTray();
  const handlePress = useCallback(() => open(view), [open, view]);

  if (asChild) {
    const child = Children.only(children) as ReactElement<{
      onPress?: (...args: unknown[]) => void;
    }>;
    return cloneElement(child, {
      onPress: (...args: unknown[]) => {
        child.props.onPress?.(...args);
        handlePress();
      },
    });
  }

  return (
    <PressableScale style={style} onPress={handlePress}>
      {children}
    </PressableScale>
  );
};

export { TrayTrigger };
