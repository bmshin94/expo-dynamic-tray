import { Stack } from "expo-router";

export default function GrokLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Grok" }} />
    </Stack>
  );
}
