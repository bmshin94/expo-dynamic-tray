# expo-dynamic-tray

A morphing, keyboard-aware bottom-sheet **tray** for React Native.

## ✨ Features

- 🫧 **Morphing presentation** — a single spring drives translateY, backdrop opacity, and sheet scale together, so the tray _grows into place_ instead of just sliding
- 📐 **Auto-sizing** — the sheet springs to whatever its content measures; no fixed heights to maintain
- 🧭 **Multi-view navigation** with a real history stack — `setView("…")` pushes, `goBack()` unwinds however deep you went
- 🎞️ **Crossfade + scale morph** between views (incoming views scale/fade in, outgoing ones fade out) for a continuous, first-party feel
- ⌨️ **Keyboard-following** via `react-native-keyboard-controller` — the tray lifts itself above the keyboard and stays glued to it
- 👆 **Swipe / flick to dismiss** with both distance-threshold and velocity detection, plus a spring rubber-band return
- 🧩 **Persistent footer slot** — pass `footer` per view; it never unmounts while switching views, so buttons don't pop or collide
- 🪝 **Imperative or declarative** — open with `<Tray.Trigger>` or drive it from anywhere with `useTray().open()`
- 🧠 TypeScript-first, fully typed surface

---

## ⚙️ Installation

```bash
git clone https://github.com/rit3zh/expo-dynamic-tray
cd expo-dynamic-tray
bun start -c
```

Peer dependencies (already wired up in this template):

```bash
bun add react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-keyboard-controller @expo/ui expo-symbols
```

---

## 🚀 Usage

Wrap your app once with `GestureHandlerRootView` and `KeyboardProvider`, then compose a `<Tray>` anywhere in the tree.

```tsx
// app/_layout.tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider enabled>
        <Stack />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
```

The simplest possible tray — one trigger, one view:

```tsx
import { Tray } from "@/components/tray";
import { Text, View } from "react-native";

export function Example() {
  return (
    <Tray>
      <Tray.Trigger style={styles.trigger}>
        <Text>Show Tray</Text>
      </Tray.Trigger>

      <Tray.Content>
        <Tray.View id="default">
          <View style={{ padding: 8 }}>
            <Text>Dynamic Tray</Text>
            <Text>Springs to its content's size and follows the keyboard.</Text>
          </View>
        </Tray.View>
      </Tray.Content>
    </Tray>
  );
}
```

## Preview

https://github.com/user-attachments/assets/00000000-0000-0000-0000-000000000000

### Opening imperatively (`useTray`)

Any child of `<Tray>` can drive it. Handy for native `@expo/ui` buttons, which must live inside a `<Host>` (so `<Tray.Trigger asChild>` can't clone them directly):

```tsx
import { Tray, useTray } from "@/components/tray";
import { Button, Host } from "@expo/ui/swift-ui";
import { buttonStyle } from "@expo/ui/swift-ui/modifiers";

function ShowTrayButton() {
  const { open } = useTray();
  return (
    <Host matchContents>
      <Button
        label="Show Tray"
        systemImage="tray.and.arrow.up.fill"
        modifiers={[buttonStyle("glass")]}
        onPress={() => open()}
      />
    </Host>
  );
}

// A view can close itself the same way:
function Body() {
  const { close } = useTray();
  return <Button label="Got it" onPress={() => close()} />;
}
```

### Multi-view navigation

Register several `<Tray.View>`s and move between them by id. The sheet morphs its height between them automatically; `goBack()` unwinds the history stack.

```tsx
import { Tray, useTray } from "@/components/tray";

function DefaultView() {
  const { setView } = useTray();
  return <Button label="Details" onPress={() => setView("details")} />;
}

function DetailsView() {
  const { goBack } = useTray();
  return <Button label="Back" onPress={goBack} />;
}

export function Settings() {
  return (
    <Tray defaultView="default">
      <Tray.Trigger>
        <Text>Settings ⚙</Text>
      </Tray.Trigger>
      <Tray.Content>
        <Tray.View id="default">
          <DefaultView />
        </Tray.View>
        <Tray.View id="details" hideFooter>
          <DetailsView />
        </Tray.View>
      </Tray.Content>
    </Tray>
  );
}
```

### A persistent footer

Pass the _same_ `footer` element to the views that share it — it lives in a stable slot below the crossfading body, so it never unmounts or jumps while you navigate.

```tsx
<Tray.Content>
  <Tray.View id="default" footer={<PrimaryButton />}>
    <DefaultView />
  </Tray.View>
  <Tray.View id="info" footer={<PrimaryButton />}>
    <InfoView />
  </Tray.View>
</Tray.Content>
```

---

## 🧱 Component Anatomy

```tsx
<Tray>
  <Tray.Trigger></Tray.Trigger>
  <Tray.Content>
    <Tray.View></Tray.View>
  </Tray.Content>
</Tray>
```

---

## 🧩 API

### `<Tray>` (root)

| Prop             | Type        | Default     | Description                                      |
| ---------------- | ----------- | ----------- | ------------------------------------------------ |
| `defaultView`    | `string`    | `"default"` | Id of the view shown when the tray opens.        |
| `closeThreshold` | `number`    | `110`       | Drag distance (px) past which release dismisses. |
| `children`       | `ReactNode` | —           | `<Tray.Trigger>` and `<Tray.Content>`.           |

### `<Tray.Trigger>`

| Prop       | Type        | Description                                                           |
| ---------- | ----------- | --------------------------------------------------------------------- |
| `view`     | `string`    | Open directly to this view id (defaults to the root's `defaultView`). |
| `asChild`  | `boolean`   | Clone the single child and inject `onPress` instead of wrapping it.   |
| `style`    | `object`    | Style for the default `PressableScale` wrapper.                       |
| `children` | `ReactNode` | The pressable content.                                                |

### `<Tray.Content>`

| Prop       | Type        | Description                        |
| ---------- | ----------- | ---------------------------------- |
| `style`    | `object`    | Extra style merged onto the sheet. |
| `children` | `ReactNode` | One or more `<Tray.View>`.         |

### `<Tray.View>`

| Prop         | Type        | Description                                                      |
| ------------ | ----------- | ---------------------------------------------------------------- |
| `id`         | `string`    | Unique id used by `setView` / `goBack` and the trigger's `view`. |
| `footer`     | `ReactNode` | Content pinned in the stable footer slot for this view.          |
| `hideFooter` | `boolean`   | Hide the footer slot entirely while this view is active.         |
| `children`   | `ReactNode` | The view body.                                                   |

### `useTray()`

| Field                                         | Type                      | Description                                                          |
| --------------------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| `open(view?)`                                 | `(view?: string) => void` | Open the tray (optionally to a specific view).                       |
| `close()`                                     | `() => void`              | Animate the tray closed.                                             |
| `visible`                                     | `boolean`                 | Whether the tray is mounted/visible.                                 |
| `view`                                        | `string`                  | The active view id.                                                  |
| `setView(id)`                                 | `(id: string) => void`    | Push a view onto the history stack.                                  |
| `goBack()`                                    | `() => void`              | Pop back to the previous view.                                       |
| `canGoBack`                                   | `boolean`                 | Whether there's history to unwind.                                   |
| `height` · `translateY` · `overlay` · `scale` | `SharedValue<number>`     | Read-only animated drivers, for advanced UI that reacts to the tray. |

Also exported: `TrayHandle`, `TrayHeader`, `TrayCloseButton`, `TrayOptionsButton`, `TraySecondaryButton`.

---

## 🧱 Stack

[Expo SDK 56](https://expo.dev/changelog) · [React Native 0.85](https://reactnative.dev/) · [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) · [Gesture Handler 2](https://docs.swmansion.com/react-native-gesture-handler/) · [Keyboard Controller](https://kirillzyusko.github.io/react-native-keyboard-controller/) · [@expo/ui](https://docs.expo.dev/versions/latest/sdk/ui/) · [Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) · [Expo Router](https://docs.expo.dev/router/introduction/)

---
