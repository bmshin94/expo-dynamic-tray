import type { ITrayLifeCycle } from "@/interface/tray-life-cycle.interface";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { withSpring } from "react-native-reanimated";

const useTrayLifeCycle = <T extends ITrayLifeCycle>({
  onClose,
  present,
  visible,
  config,
}: T) => {
  useEffect(() => {
    if (!visible) {
      return;
    }

    present.value = withSpring(1, config);

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [visible, present, onClose, config]);
};

export { useTrayLifeCycle };
