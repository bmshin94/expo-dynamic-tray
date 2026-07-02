import { TextInputPlaceHolder } from "@/components/ui/x-text-input-placeholder";
import { COLORS } from "@/design/tokens";
import { NativeTabs } from "expo-router/build/native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs
      disableTransparentOnScrollEdge
      minimizeBehavior="onScrollDown"
      labelStyle={{
        selected: {
          color: COLORS.TAB_BAR_FONT_SELECTED,
        },
      }}
    >
      <NativeTabs.BottomAccessory>
        <TextInputPlaceHolder />
      </NativeTabs.BottomAccessory>
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Icon
          src={{
            default: require("@/assets/tab.icons/home.outline.light.png"),
            selected: require("@/assets/tab.icons/home.fill.light.png"),
          }}
        />
        <NativeTabs.Trigger.Label hidden>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(search)">
        <NativeTabs.Trigger.Icon
          src={{
            default: require("@/assets/tab.icons/search.outline.light.png"),
            selected: require("@/assets/tab.icons/search.fill.light.png"),
          }}
        />
        <NativeTabs.Trigger.Label hidden>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(grok)">
        <NativeTabs.Trigger.Icon
          src={{
            default: require("@/assets/tab.icons/grok.outline.light.png"),
            selected: require("@/assets/tab.icons/grok.fill.light.png"),
          }}
        />
        <NativeTabs.Trigger.Label hidden>Grok</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(notifications)">
        <NativeTabs.Trigger.Icon
          src={{
            default: require("@/assets/tab.icons/notifications.light.outline.png"),
            selected: require("@/assets/tab.icons/notifications.light.fill.png"),
          }}
        />
        <NativeTabs.Trigger.Label hidden>
          Notifications
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(chat)">
        <NativeTabs.Trigger.Icon
          src={{
            default: require("@/assets/tab.icons/chat.outline.light.png"),
            selected: require("@/assets/tab.icons/chat.fill.light.png"),
          }}
        />
        <NativeTabs.Trigger.Label hidden>Chat</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
