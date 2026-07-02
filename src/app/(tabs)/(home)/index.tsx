import { Tray, useTray } from "@/components/tray";
import {
  Button,
  Divider,
  Host,
  HStack,
  Image,
  Picker,
  Spacer,
  TextField,
  Toggle,
  Text as UIText,
  VStack,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  font,
  foregroundStyle,
  frame,
  padding,
  pickerStyle,
  tag,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";
import { Fragment, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { SFSymbol } from "sf-symbols-typescript";

const WHITE = "#FFFFFF";
const GRAY = "#8E8E93";

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

function NavRow({
  icon,
  label,
  to,
}: {
  icon: SFSymbol;
  label: string;
  to: string;
}) {
  const { setView } = useTray();
  return (
    <Button modifiers={[buttonStyle("plain")]} onPress={() => setView(to)}>
      <HStack spacing={14} modifiers={[padding({ vertical: 13 })]}>
        <Image systemName={icon} size={18} color={WHITE} />
        <UIText modifiers={[font({ size: 17 }), foregroundStyle(WHITE)]}>
          {label}
        </UIText>
        <Spacer />
        <Image systemName="chevron.right" size={14} color={GRAY} />
      </HStack>
    </Button>
  );
}

function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <HStack modifiers={[padding({ vertical: 13 })]}>
      <UIText modifiers={[font({ size: 17 }), foregroundStyle(WHITE)]}>
        {label}
      </UIText>
      <Spacer />
      <UIText modifiers={[font({ size: 17 }), foregroundStyle(GRAY)]}>
        {value}
      </UIText>
    </HStack>
  );
}

function Hero({
  icon,
  title,
  subtitle,
}: {
  icon: SFSymbol;
  title: string;
  subtitle: string;
}) {
  return (
    <HStack>
      <Spacer />
      <VStack spacing={6}>
        <Image systemName={icon} size={34} color={WHITE} />
        <UIText
          modifiers={[
            font({ size: 20, weight: "bold" }),
            foregroundStyle(WHITE),
          ]}
        >
          {title}
        </UIText>
        <UIText modifiers={[font({ size: 14 }), foregroundStyle(GRAY)]}>
          {subtitle}
        </UIText>
      </VStack>
      <Spacer />
    </HStack>
  );
}

function BackHeader() {
  const { goBack } = useTray();
  return (
    <HStack>
      <Button modifiers={[buttonStyle("plain")]} onPress={goBack}>
        <Image systemName="chevron.left" size={18} color={WHITE} />
      </Button>
      <Spacer />
    </HStack>
  );
}

function DoneButton({
  label = "Done",
  icon,
}: {
  label?: string;
  icon?: SFSymbol;
}) {
  const { goBack } = useTray();
  return (
    <Button
      label={label}
      systemImage={icon}
      modifiers={[buttonStyle("glass"), frame({ maxWidth: Infinity })]}
      onPress={goBack}
    />
  );
}

function MenuView() {
  const { close } = useTray();
  return (
    <Host
      matchContents={{ vertical: true }}
      colorScheme="dark"
      style={styles.host}
    >
      <VStack spacing={2} alignment="leading">
        <HStack modifiers={[padding({ bottom: 8 })]}>
          <UIText
            modifiers={[
              font({ size: 22, weight: "bold" }),
              foregroundStyle(WHITE),
            ]}
          >
            Settings
          </UIText>
          <Spacer />
          <Button modifiers={[buttonStyle("plain")]} onPress={close}>
            <Image systemName="xmark.circle.fill" size={22} color={GRAY} />
          </Button>
        </HStack>

        <NavRow icon="person.crop.circle" label="Account" to="account" />
        <Divider />
        <NavRow icon="bell" label="Notifications" to="notifications" />
        <Divider />
        <NavRow icon="paintbrush" label="Appearance" to="appearance" />
        <Divider />
        <NavRow
          icon="bubble.left.and.bubble.right"
          label="Feedback"
          to="feedback"
        />
      </VStack>
    </Host>
  );
}

function AccountView() {
  return (
    <Host
      matchContents={{ vertical: true }}
      colorScheme="dark"
      style={styles.host}
    >
      <VStack spacing={16} alignment="leading">
        <BackHeader />
        <Hero
          icon="person.crop.circle"
          title="Account"
          subtitle="Your handle, email, and sign-in."
        />
        <VStack spacing={2} alignment="leading">
          <ValueRow label="Name" value="Ritesh" />
          <Divider />
          <ValueRow label="Username" value="@rit3zh" />
          <Divider />
          <ValueRow label="Email" value="you@example.com" />
        </VStack>
        <DoneButton />
      </VStack>
    </Host>
  );
}

function NotificationsView() {
  const [prefs, setPrefs] = useState({
    mentions: true,
    replies: true,
    news: false,
  });
  const items: { key: keyof typeof prefs; label: string }[] = [
    { key: "mentions", label: "Mentions" },
    { key: "replies", label: "Replies" },
    { key: "news", label: "Product news" },
  ];
  return (
    <Host
      matchContents={{ vertical: true }}
      colorScheme="dark"
      style={styles.host}
    >
      <VStack spacing={16} alignment="leading">
        <BackHeader />
        <Hero
          icon="bell"
          title="Notifications"
          subtitle="Choose which alerts reach you."
        />
        <VStack spacing={2} alignment="leading">
          {items.map((item, i) => (
            <Fragment key={item.key}>
              {i > 0 ?
                <Divider />
              : null}
              <Toggle
                label={item.label}
                isOn={prefs[item.key]}
                onIsOnChange={(v) => setPrefs((p) => ({ ...p, [item.key]: v }))}
                modifiers={[tint(GRAY), padding({ vertical: 6 })]}
              />
            </Fragment>
          ))}
        </VStack>
        <DoneButton />
      </VStack>
    </Host>
  );
}

function AppearanceView() {
  const [theme, setTheme] = useState("system");
  return (
    <Host
      matchContents={{ vertical: true }}
      colorScheme="dark"
      style={styles.host}
    >
      <VStack spacing={16} alignment="leading">
        <BackHeader />
        <Hero icon="paintbrush" title="Appearance" subtitle="Pick a theme." />
        <Picker
          modifiers={[pickerStyle("segmented")]}
          selection={theme}
          onSelectionChange={setTheme}
        >
          <UIText modifiers={[tag("system")]}>System</UIText>
          <UIText modifiers={[tag("light")]}>Light</UIText>
          <UIText modifiers={[tag("dark")]}>Dark</UIText>
        </Picker>
        <DoneButton />
      </VStack>
    </Host>
  );
}

function FeedbackView() {
  const [, setText] = useState("");
  return (
    <Host
      matchContents={{ vertical: true }}
      colorScheme="dark"
      style={styles.host}
    >
      <VStack spacing={16} alignment="leading">
        <BackHeader />
        <Hero
          icon="bubble.left.and.bubble.right"
          title="Feedback"
          subtitle="The tray floats above the keyboard."
        />
        <TextField
          autoFocus
          placeholder="Share your thoughts…"
          onTextChange={setText}
        />
        <DoneButton label="Send" icon="paperplane.fill" />
      </VStack>
    </Host>
  );
}

export default function Index() {
  const router = useRouter();

  const goToPosts = useCallback(() => {
    router.push("/(tabs)/(home)/post");
  }, [router]);

  return (
    <View style={styles.container}>
      <Host matchContents>
        <Button
          label="Go To Posts Screen"
          systemImage="arrow.up.forward.app.fill"
          modifiers={[buttonStyle("glass")]}
          onPress={goToPosts}
        />
      </Host>

      <Tray defaultView="menu">
        <ShowTrayButton />
        <Tray.Content>
          <Tray.View id="menu">
            <MenuView />
          </Tray.View>
          <Tray.View id="account">
            <AccountView />
          </Tray.View>
          <Tray.View id="notifications">
            <NotificationsView />
          </Tray.View>
          <Tray.View id="appearance">
            <AppearanceView />
          </Tray.View>
          <Tray.View id="feedback">
            <FeedbackView />
          </Tray.View>
        </Tray.Content>
      </Tray>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  host: {
    width: "100%",
  },
});
