import { Stack } from "expo-router";

export default function NotficationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />
    </Stack>
  );
}
