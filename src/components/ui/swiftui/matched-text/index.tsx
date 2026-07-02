import { Text as SwiftText } from "@expo/ui/swift-ui";
import {
  Animation,
  animation,
  contentTransition,
  font,
} from "@expo/ui/swift-ui/modifiers";
import { memo, useRef } from "react";
import type { IContentTransition } from "./interface";

const MatchedText: React.MemoExoticComponent<React.FC<IContentTransition>> =
  memo(
    ({
      texts,
      index,
      width = 240,
      fontSize = 17,
      align = "leading",
      maxLines,
    }: IContentTransition): React.ReactNode &
      React.JSX.Element &
      React.ReactElement => {
      const value = texts[index] ?? "";

      const prev = useRef(value);
      const trigger = useRef(0);
      if (prev.current !== value) {
        prev.current = value;
        trigger.current += 1;
      }

      return (
        <SwiftText
          modifiers={[
            font({ size: fontSize, weight: "medium" }),
            contentTransition("numericText"),
            animation(
              Animation.spring({
                response: 0.2,
                dampingFraction: 1,
              }),
              trigger.current,
            ),
          ]}
        >
          {value}
        </SwiftText>
      );
    },
  );

export { MatchedText };
