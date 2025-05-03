import * as Crypto from "expo-crypto";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type TItem = {
  id: string;
  name: string;
  handle: string;
  time: string;
  post: string;
  image: ImageSourcePropType;
  commentsCount: number;
  shareCount: number;
  likesCount: number;
};

const item1 = {
  name: "Lena Thompson",
  handle: "@skywalker42",
  time: "1h",
  post: "Just wrapped up a weekend hiking trip and I can't believe how refreshing it was to disconnect for a bit. No screens, no notifications—just nature, fresh air, and a solid group of friends. Sometimes stepping away is exactly what you need to recharge and refocus. Highly recommend it if you're feeling burnt out or stuck in a routine. Fresh air clears more than just your lungs.",
  image: require("@/src/assets/avatar-1.jpg"),
  commentsCount: 10,
  shareCount: 3,
  likesCount: 7,
};

const item2 = {
  name: "Marcus Rivera",
  handle: "@pixelbyte",
  time: "2h",
  post: "I’ve been experimenting with early morning routines and it’s wild how much more I can get done before 9 AM. A bit of journaling, a walk, and no phone until after breakfast—it’s simple but effective. It’s like my brain finally has time to breathe before the day takes over. Still figuring it out, but I’m seeing real improvement in focus and mood.",
  image: require("@/src/assets/avatar-2.jpg"),
  commentsCount: 2,
  shareCount: 1,
  likesCount: 3,
};

const item3 = {
  name: "Tariq Ali",
  handle: "@echohawk",
  time: "3h",
  post: "Why is it that every time you think you’ve figured something out, life throws another curveball? I guess that’s the whole point—growth doesn’t come from comfort. Still, it’s exhausting. I’m trying to lean into it, take the lesson, and move forward. Some days are easier than others. Just trying to keep showing up.",
  image: require("@/src/assets/avatar-3.jpg"),
  commentsCount: 1,
  shareCount: 3,
  likesCount: 2,
};

const item4 = {
  name: "Isla McKenzie",
  handle: "@frostnova",
  time: "4h",
  post: "Saw the most surreal sunset today—whole sky lit up in these streaks of orange and purple like someone painted it. It stopped me in my tracks. It's easy to forget how insane the natural world is when you're buried in work, but moments like that pull you out and remind you what you're missing. Might make time for a proper photo walk soon.",
  image: require("@/src/assets/avatar-4.jpg"),
  commentsCount: 1,
  shareCount: 1,
  likesCount: 1,
};

const item5 = {
  name: "Nina Patel",
  handle: "@nightowl",
  time: "5h",
  post: "I’ve been experimenting with early morning routines and it’s wild how much more I can get done before 9 AM. A bit of journaling, a walk, and no phone until after breakfast—it’s simple but effective. It’s like my brain finally has time to breathe before the day takes over. Still figuring it out, but I’m seeing real improvement in focus and mood.",
  image: require("@/src/assets/avatar-5.jpg"),
  commentsCount: 2,
  shareCount: 1,
  likesCount: 2,
};

function getItem(mod: number) {
  switch (mod) {
    case 0:
      return item1;
    case 1:
      return item2;
    case 2:
      return item3;
    case 3:
      return item4;
    default:
      return item5;
  }
}

const data: Array<TItem> = Array(1000)
  .fill(0)
  .map((_, i) => {
    const mod = i % 5;

    const item = getItem(mod);

    return {
      id: Crypto.randomUUID(),
      ...item,
    };
  });

export default function PerformanceScreen() {
  return <FlatList data={data} renderItem={renderItem} />;
}

function renderItem(props: ListRenderItemInfo<TItem>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: ListRenderItemInfo<TItem>) {
  return (
    <View className="p-3 flex-row gap-2 bg-white border-b border-b-gray-200">
      <Image source={item.image} className="w-16 h-16 rounded-full" />
      <View className="flex-1 gap-3">
        <View>
          <View className="flex-row gap-2 items-center">
            <Text className="font-bold text-lg">{item.name}</Text>
            <Text className="text-gray-600">{`${item.handle} · ${item.time}`}</Text>
          </View>
          <Text>{item.post}</Text>
        </View>
        <View className="flex-row gap-9 items-center">
          <View className="flex-row gap-1 items-center">
            <Ionicons name="chatbubble-outline" size={16} color={"#6b7280"} />
            <Text className="text-gray-500 text-lg">{item.commentsCount}</Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <Ionicons name="repeat-sharp" size={16} color={"#6b7280"} />
            <Text className="text-gray-500 text-lg">{item.shareCount}</Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <Ionicons name="heart-outline" size={16} color={"#6b7280"} />
            <Text className="text-gray-500 text-lg">{item.likesCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
