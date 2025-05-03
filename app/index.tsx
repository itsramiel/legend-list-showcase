import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, type LinkProps } from "expo-router";
import { FlatList, ListRenderItemInfo, Pressable, Text } from "react-native";

type TITem = {
  title: string;
  route: LinkProps["href"];
};

const examples = Array<TITem>({
  title: "Performance",
  route: "/performance",
});

export default function ExamplesScreen() {
  return <FlatList data={examples} renderItem={renderItem} />;
}

function renderItem(props: ListRenderItemInfo<TITem>) {
  return <ListItem {...props} />;
}

export function ListItem({ item }: ListRenderItemInfo<TITem>) {
  const router = useRouter();

  return (
    <Pressable
      className="p-5 bg-white border-b border-b-gray-100 flex-row items-center"
      onPress={() => router.navigate(item.route)}
    >
      <Text className="text-xl flex-1 font-medium">{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} />
    </Pressable>
  );
}
