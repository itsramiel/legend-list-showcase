import "@/global.css";

import "react-native-reanimated";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Examples",
          }}
        />
        <Stack.Screen
          name="performance"
          options={{
            title: "Performance",
          }}
        />
        <Stack.Screen
          name="scroll-to-nth-item"
          options={{
            title: "Scroll to Nth Item",
          }}
        />
        <Stack.Screen
          name="chat-ui"
          options={{
            title: "Chat UI",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </KeyboardProvider>
  );
}
