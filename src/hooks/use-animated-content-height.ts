import { IAnimatedHeightContent } from "@/interface/animated-content-height.interface";
import { useCallback, useRef } from "react";
import { LayoutChangeEvent } from "react-native";
import { withSpring } from "react-native-reanimated";

const useAnimatedContentHeight = <T extends IAnimatedHeightContent>({
  height,
  config,
}: T) => {
  const measured = useRef<boolean>(false);
  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const nextHeight = event.nativeEvent.layout.height;

      if (nextHeight <= 0) {
        return;
      }

      if (!measured.current) {
        measured.current = true;
        height.value = nextHeight;
        return;
      }

      height.value = withSpring(nextHeight, config);
    },
    [height, config],
  );

  return {
    onContentLayout,
    hasMeasured: measured,
  };
};

export { useAnimatedContentHeight };
