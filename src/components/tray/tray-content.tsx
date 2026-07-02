import { SIZE } from "@/constants/size.const";
import { useKeyboardStickyOffset } from "@/hooks/use-sticky-keyboard-offset";
import { useTray } from "@/hooks/use-tray";
import { IStickyKeyboardOffset } from "@/interface/sticky-keyboard-offset.interface";
import type { ITrayContent, ITrayView } from "@/interface/tray.interface";
import { useViewLayerStyle } from "@/transitions/transition";
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, StyleSheet, View, ViewStyle } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "./animated-pressable";
import { TrayHandle } from "./tray-handle";

const FOOTER_HEIGHT = 65;

function TrayViewLayer({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  const style = useViewLayerStyle(active);
  return (
    <Animated.View
      style={[active ? styles.activeLayer : styles.inactiveLayer, style]}
      pointerEvents={active ? "auto" : "none"}
    >
      {children}
    </Animated.View>
  );
}

const TrayContent: React.FC<ITrayContent> &
  React.FunctionComponent<ITrayContent> = ({
  children,
  style,
}: ITrayContent & React.ComponentProps<typeof TrayContent>):
  | (React.ReactNode & React.JSX.Element & React.ReactElement)
  | null => {
  const insets = useSafeAreaInsets();
  const {
    visible,
    view,
    close,
    height,
    translateY,
    overlay,
    scale,
    keyboardHeight,
    onContentLayout,
    pan,
  } = useTray();

  const sheetStyle = useAnimatedStyle<Pick<ViewStyle, "height" | "transform">>(
    () => ({
      height: height.value === 0 ? undefined : height.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    }),
  );

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlay.value }));

  const allViews = useMemo(
    () =>
      Children.toArray(children).filter(
        (child): child is ReactElement<ITrayView> =>
          isValidElement<ITrayView>(child),
      ),
    [children],
  );

  const activeView = useMemo(
    () => allViews.find((child) => child.props.id === view) ?? null,
    [allViews, view],
  );

  const footer =
    activeView && !activeView.props.hideFooter ?
      (activeView.props.footer ?? null)
    : null;

  const [mountedIds, setMountedIds] = useState<Set<string>>(
    () => new Set([view]),
  );

  useEffect(() => {
    if (visible) {
      setMountedIds((prev) =>
        prev.has(view) ? prev : new Set(prev).add(view),
      );
    } else {
      setMountedIds(new Set());
    }
  }, [visible, view]);

  const mountedViews = useMemo(
    () => allViews.filter((child) => mountedIds.has(child.props.id)),
    [allViews, mountedIds],
  );

  const stickyOffset = useKeyboardStickyOffset<IStickyKeyboardOffset>({
    keyboardHeight,
    screenHeight: SIZE.SCREEN_HEIGHT,
    topInset: insets.top,
  });

  if (!visible) {
    return null;
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={close}
    >
      <View style={styles.fill} pointerEvents="box-none">
        <AnimatedPressable
          style={[styles.overlay, overlayStyle]}
          onPress={close}
        />
        <KeyboardStickyView offset={stickyOffset}>
          <View
            style={[
              styles.sheetWrap,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
            pointerEvents="box-none"
          >
            <Animated.View style={[styles.sheet, style, sheetStyle]}>
              <View style={styles.sheetInner} onLayout={onContentLayout}>
                <GestureDetector gesture={pan}>
                  <View style={styles.handleArea}>
                    <TrayHandle />
                  </View>
                </GestureDetector>
                <View style={styles.stack}>
                  {mountedViews.map((child) => (
                    <TrayViewLayer
                      key={child.props.id}
                      active={child.props.id === view}
                    >
                      {child}
                    </TrayViewLayer>
                  ))}
                </View>
                {footer ?
                  <View style={{ height: FOOTER_HEIGHT }} />
                : null}
              </View>
              {footer ?
                <View style={styles.footer}>{footer}</View>
              : null}
            </Animated.View>
          </View>
        </KeyboardStickyView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheetWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  sheet: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 38,
    backgroundColor: "#141414",
    overflow: "hidden",
  },
  sheetInner: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  handleArea: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
  },
  stack: {
    position: "relative",
  },
  activeLayer: {
    position: "relative",
  },
  inactiveLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 24,
  },
});

export { TrayContent };
