import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

type TItem = {
  id: string;
  datetime: string;
  message: string;
  sender: "me" | "them";
};

export default function ChatUi() {
  const [data, setData] = useState<Array<TItem>>(INITIAL_DATA.toReversed());

  const onSend = (message: string) => {
    setData((prev) => [
      {
        id: Crypto.randomUUID(),
        datetime: new Date().toISOString(),
        message,
        sender: "me",
      },
      ...prev,
    ]);
  };

  return (
    <View className="flex-1 bg-gray-200">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100.333 : 97.14}
      >
        <FlatList
          inverted
          className="flex-1"
          contentContainerClassName="p-2 gap-3"
          data={data}
          renderItem={renderItem}
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

function renderItem(props: ListRenderItemInfo<TItem>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: ListRenderItemInfo<TItem>) {
  return (
    <View className={`${item.sender === "me" ? "items-end" : ""}`}>
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
);
