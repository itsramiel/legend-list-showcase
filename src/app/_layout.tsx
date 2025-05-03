import "@/global.css";

import "react-native-reanimated";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
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
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
