import type { IPressableScale } from "@/interface/pressable-scale.interface";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PressableScale: React.FC<IPressableScale> &
  React.FunctionComponent<IPressableScale> = ({
  children,
  style,
  onPress,
  scaleTo = 0.96,
  animatedStyle: _animatedStyle,
}: IPressableScale): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(scaleTo, { duration: 120 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 120 });
      }}
      style={[style, animatedStyle, _animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
};

export { PressableScale };
