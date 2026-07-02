import {
  DRAG_RETURN_SPRING_CONFIG,
  HEIGHT_SPRING_CONFIG,
  PRESENT_SPRING_CONFIG,
} from "@/constants/animation.const";
import {
  CLOSE_EASING,
  DEFAULT_CLOSE_THRESHOLD,
  PRESENT_START_SCALE,
  PRESENT_TRAVEL,
} from "@/constants/tray.const";
import { TrayContext } from "@/context";
import { useAnimatedClose } from "@/hooks/use-animated-close";
import { useAnimatedContentHeight } from "@/hooks/use-animated-content-height";
import { useDismissPanGesture } from "@/hooks/use-dismiss-pan-gesture";
import { useTrayLifeCycle } from "@/hooks/use-tray-life-cycle";
import { IAnimatedClose } from "@/interface/animated-close.interface";
import { IAnimatedHeightContent } from "@/interface/animated-content-height.interface";
import { IDismissPanGesture } from "@/interface/dismiss-pan-gesture.interface";
import { ITrayContextValue } from "@/interface/tray-context.interface";
import { ITrayLifeCycle } from "@/interface/tray-life-cycle.interface";
import type { ITrayRoot } from "@/interface/tray.interface";
import { useCallback, useMemo, useState } from "react";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const TrayRoot: React.FC<ITrayRoot> & React.FunctionComponent<ITrayRoot> = ({
  children,
  defaultView = "default",
  closeThreshold = DEFAULT_CLOSE_THRESHOLD,
}: ITrayRoot & React.ComponentProps<typeof TrayRoot>): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
  const [visible, setVisible] = useState(false);

  const [history, setHistory] = useState<string[]>([defaultView]);
  const view = history[history.length - 1];

  const setView = useCallback((next: string) => {
    setHistory((current) =>
      current[current.length - 1] === next ? current : [...current, next],
    );
  }, []);

  const goBack = useCallback(() => {
    setHistory((current) =>
      current.length > 1 ? current.slice(0, -1) : current,
    );
  }, []);

  const canGoBack = history.length > 1;

  const height = useSharedValue(0);

  const present = useSharedValue(0);
  const dragY = useSharedValue(0);

  const translateY = useDerivedValue(
    () =>
      interpolate(
        present.value,
        [0, 1],
        [PRESENT_TRAVEL, 0],
        Extrapolation.CLAMP,
      ) + dragY.value,
  );

  const overlay = useDerivedValue(
    () =>
      present.value *
      interpolate(
        dragY.value,
        [0, PRESENT_TRAVEL],
        [1, 0.4],
        Extrapolation.CLAMP,
      ),
  );

  const scale = useDerivedValue(() =>
    interpolate(
      present.value,
      [0, 1],
      [PRESENT_START_SCALE, 1],
      Extrapolation.CLAMP,
    ),
  );

  const finishClose = useCallback(() => setVisible(false), []);

  const animateClose = useAnimatedClose<IAnimatedClose>({
    present,
    onFinish: finishClose,

    duration: 340,
    easing: CLOSE_EASING,
  });

  const close = useCallback(() => {
    animateClose();
  }, [animateClose]);

  const open = useCallback(
    (initialView: string = defaultView) => {
      setHistory([initialView]);
      height.value = 0;
      present.value = 0;
      dragY.value = 0;
      setVisible(true);
    },
    [defaultView, height, present, dragY],
  );

  useTrayLifeCycle<ITrayLifeCycle>({
    visible,
    present,
    onClose: close,
    config: PRESENT_SPRING_CONFIG,
  });

  const { onContentLayout } = useAnimatedContentHeight<IAnimatedHeightContent>({
    height,
    config: HEIGHT_SPRING_CONFIG,
  });

  const pan = useDismissPanGesture<IDismissPanGesture>({
    dragY,
    onDismiss: animateClose,
    closeThreshold,
    config: DRAG_RETURN_SPRING_CONFIG,
  });

  const value = useMemo<ITrayContextValue>(
    () => ({
      visible,
      view,
      setView,
      goBack,
      canGoBack,
      open,
      close,
      height,
      translateY,
      overlay,
      scale,
      keyboardHeight,
      onContentLayout,
      pan,
    }),
    [
      visible,
      view,
      setView,
      goBack,
      canGoBack,
      open,
      close,
      height,
      translateY,
      overlay,
      scale,
      keyboardHeight,
      onContentLayout,
      pan,
    ],
  );

  return <TrayContext.Provider value={value}>{children}</TrayContext.Provider>;
};

export { TrayRoot };
