import { EXTRA_OFFSET } from "@/constants/tray.const";
import { IStickyKeyboardOffset } from "@/interface/sticky-keyboard-offset.interface";
import { useMemo } from "react";

const useKeyboardStickyOffset = <T extends IStickyKeyboardOffset>({
  keyboardHeight,
  screenHeight,
  topInset,
  extraOffset = EXTRA_OFFSET,
}: T) => {
  const closed = useMemo(
    () => screenHeight + topInset + extraOffset!,
    [screenHeight, topInset, extraOffset],
  );

  return useMemo(
    () => ({
      opened: closed + keyboardHeight.value,
      closed,
    }),
    [closed, keyboardHeight],
  );
};

export { useKeyboardStickyOffset };
