import { useState } from "react";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";
import { ActivityIndicator, FlatListProps, Text, View } from "react-native";

const now = new Date();

const INITIAL_DATA = Array.from({ length: 24 })
  .fill(0)
  .map((_, i) => {
    return new Date(now.getFullYear(), i);
  });

const LIST_PADDING = 8;
export default function BidirectionalInfiniteScroll() {
  const [data, setData] = useState<Array<Date>>(INITIAL_DATA);
  const [isLoadingNextData, setIsLoadingNextData] = useState(false);
  const [isLoadingPrevData, setIsLoadingPrevData] = useState(false);

  const onEndReached: FlatListProps<Date>["onEndReached"] = () => {
    const lastDate = data[data.length - 1];
    const nextData = Array.from({ length: 10 })
      .fill(0)
      .map((_, i) => {
        return new Date(lastDate.getFullYear(), lastDate.getMonth() + i + 1);
      });

    setIsLoadingNextData(true);
    setTimeout(() => {
      setData((prevData) => [...prevData, ...nextData]);
      setIsLoadingNextData(false);
    }, 2000);
  };

  const onStartReached = () => {
    setIsLoadingPrevData(true);
    const firstDate = data[0];
    const prevData = Array.from({ length: 10 })
      .fill(0)
      .map((_, i) => {
        return new Date(firstDate.getFullYear(), firstDate.getMonth() - i - 1);
      });
    setTimeout(() => {
      setIsLoadingPrevData(false);
      setData([...prevData.reverse(), ...data]);
    }, 2000);
  };

  return (
    <View className="flex-1 bg-white">
      <LegendList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item) => item.valueOf().toString()}
        renderItem={renderItem}
        maintainVisibleContentPosition
        contentContainerStyle={{ padding: LIST_PADDING }}
        ItemSeparatorComponent={ItemSeperator}
        onEndReached={onEndReached}
        onStartReached={onStartReached}
        initialScrollIndex={data.findIndex((item) => {
          return (
            item.getFullYear() === now.getFullYear() &&
            item.getMonth() === now.getMonth()
          );
        })}
        ListHeaderComponent={
          <ActivityIndicator animating={isLoadingPrevData} />
        }
        ListFooterComponent={
          <ActivityIndicator animating={isLoadingNextData} />
        }
      />
    </View>
  );
}

function ItemSeperator() {
  return <View className="h-2 w-full" />;
}

function renderItem(props: LegendListRenderItemProps<Date>) {
  return <ListItem {...props} />;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
});

function ListItem({ item }: LegendListRenderItemProps<Date>) {
  return (
    <View
      style={{
        backgroundColor:
          MONTHLY_COLORS[item.getMonth() % MONTHLY_COLORS.length],
      }}
      className="items-center justify-center rounded p-16"
    >
      <Text className="font-semibold text-2xl">
        {dateFormatter.format(item)}
      </Text>
    </View>
  );
}

const MONTHLY_COLORS = [
  "#C1D7E0",
  "#D6CDE0",
  "#B1D8B7",
  "#FFE0B2",
  "#FFCC80",
  "#FFF176",
  "#FFD54F",
  "#FFAB91",
  "#A5D6A7",
  "#CE93D8",
  "#B0BEC5",
  "#FFCDD2",
] as const;
