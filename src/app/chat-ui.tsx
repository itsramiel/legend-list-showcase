import { Button, Platform, Text, TextInput, View } from "react-native";
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useHeaderHeight } from "@react-navigation/elements";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";

type TItem = {
  id: string;
  datetime: string;
  message: string;
  sender: "me" | "them";
};

export default function ChatUi() {
  const [data, setData] = useState<Array<TItem>>(INITIAL_DATA);

  const onSend = (message: string) => {
    setData((prev) => [
      ...prev,
      {
        id: Crypto.randomUUID(),
        datetime: new Date().toISOString(),
        message,
        sender: "me",
      },
    ]);
  };

  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1 bg-gray-200">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="position"
        contentContainerStyle={{ flex: 1 }}
        // headerHeight is broken on Android https://github.com/software-mansion/react-native-screens/issues/2661
        keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 97.14}
      >
        <LegendList
          alignItemsAtEnd
          className="flex-1"
          contentContainerStyle={{
            padding: 8,
          }}
          data={data}
          renderItem={renderItem}
          initialScrollIndex={data.length - 1}
          keyExtractor={(item) => item.id}
          maintainScrollAtEnd
        />
        <Input onSend={onSend} />
      </KeyboardAvoidingView>
      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}

interface InputProps {
  onSend: (message: string) => void;
}

function Input({ onSend }: InputProps) {
  const [message, setMessage] = useState("");

  return (
    <View className="flex-row border-t border-t-gray-300 py-2 px-3 gap-2 bg-white">
      <TextInput
        value={message}
        onChangeText={setMessage}
        className="flex-1 p-2 bg-gray-100 rounded"
        placeholder="Enter message"
      />
      <Button title="Send" onPress={() => onSend(message)} />
    </View>
  );
}

function renderItem(props: LegendListRenderItemProps<TItem>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: LegendListRenderItemProps<TItem>) {
  return (
    <View className={`${item.sender === "me" ? "items-end" : ""} my-1`}>
      <View
        className={`w-3/4 rounded p-2 ${item.sender === "me" ? "bg-blue-200" : "bg-white"}`}
      >
        <Text>{item.message}</Text>
        <Text>
          {new Date(item.datetime).toLocaleTimeString("en", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </View>
    </View>
  );
}

const INITIAL_DATA = Array<TItem>(
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:00:04.950Z",
    message: "Hey, are you free to talk now?",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:01:10.230Z",
    message: "Yeah, what's up?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:02:15.421Z",
    message: "I need help debugging a React Native issue.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:03:05.750Z",
    message: "Sure, what's the problem?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:03:45.112Z",
    message: "The app crashes on startup after the latest update.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:04:20.338Z",
    message: "Any logs or errors you can share?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:05:04.950Z",
    message: "Yeah, it throws an undefined is not a function error.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:06:30.125Z",
    message: "Sounds like a hook or prop issue. Did you update any libs?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:07:10.980Z",
    message: "Yeah, I bumped react-navigation to v7 yesterday.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:08:40.407Z",
    message: "That could be it. Check their changelog for breaking changes.",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:06:30.125Z",
    message: "Sounds like a hook or prop issue. Did you update any libs?",
    sender: "them",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:07:10.980Z",
    message: "Yeah, I bumped react-navigation to v7 yesterday.",
    sender: "me",
  },
  {
    id: Crypto.randomUUID(),
    datetime: "2025-05-05T16:08:40.407Z",
    message: "That could be it. Check their changelog for breaking changes.",
    sender: "them",
  },
);
