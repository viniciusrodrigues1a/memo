import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
  RouteProp,
} from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Status } from "../../../entities/Status";
import { showBoardUseCase } from "../../factories";

import { StackParamList } from "../../routes/StackNavigation";

import AddButton from "../../components/AddButton";
import { Card } from "./Card";

const windowWidth = Dimensions.get("window").width;
const tabBarButtonWidth = Math.floor(windowWidth / 3);

export default function Board() {
  const [contentIndex, setContentIndex] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const isFocused = useIsFocused();

  const route = useRoute<RouteProp<StackParamList, "Board">>();
  const navigation = useNavigation();

  const contentFlatListRef = useRef(null);
  const tabBarFlatListRef = useRef(null);

  useEffect(() => {
    (async () => {
      const board = await showBoardUseCase.show(route.params.id);
      setStatuses(board.statuses);
    })();
  }, [isFocused, route.params.id]);

  const onViewableItemsChanged = useCallback((items) => {
    if (items.viewableItems.length === 0) {
      return;
    }

    const newIndex = items.viewableItems[0].index;
    setContentIndex(newIndex);
    tabBarFlatListRef.current.scrollToOffset({
      offset: tabBarButtonWidth * newIndex,
    });
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        waitForInteraction: false,
        viewAreaCoveragePercentThreshold: 100,
      },
      onViewableItemsChanged,
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={headerStyles.container}>
        <TouchableOpacity>
          <Text style={headerStyles.searchText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 58 }}>
        <FlatList
          ref={tabBarFlatListRef}
          style={tabFlatListStyles.container}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.name}
          data={statuses}
          renderItem={({ item, index }) => (
            <>
              <TouchableOpacity
                onPress={() =>
                  contentFlatListRef.current.scrollToOffset({
                    offset: windowWidth * index,
                  })
                }
                style={[
                  tabFlatListStyles.tabButton,
                  {
                    borderBottomColor:
                      index === contentIndex ? "#ffffff" : "#4A9C8F",
                  },
                ]}
              >
                <Text
                  style={[
                    tabFlatListStyles.tabButtonText,
                    { color: index === contentIndex ? "#ffffff" : "#cccccc" },
                  ]}
                >
                  {item.name.toUpperCase()}
                </Text>
              </TouchableOpacity>

              {index === 4 && (
                <TouchableOpacity style={tabFlatListStyles.buttonAddTab}>
                  <Feather name="plus" color="#1F8978" size={28} />
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>

      <FlatList
        ref={contentFlatListRef}
        style={contentFlatListStyles.container}
        decelerationRate="fast"
        snapToInterval={windowWidth}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        data={statuses}
        renderItem={({ item: status }) => (
          <View style={contentFlatListStyles.content}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(i) => i.id}
              data={status.stories}
              renderItem={({ item: story }) => <Card story={story} />}
            />
          </View>
        )}
      />

      <AddButton
        onPress={() =>
          navigation.navigate("CreateStory", {
            boardId: route.params.id,
            statusId: route.params.statuses[contentIndex].id,
          })
        }
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#067C69",
    height: 60,
    width: "100%",
    justifyContent: "center",
    elevation: 14,
  },
  searchText: {
    alignSelf: "flex-end",
    marginRight: 16,
    fontSize: 18,
    color: "#dddddd",
    letterSpacing: 0.75,
  },
});

const tabFlatListStyles = StyleSheet.create({
  container: { backgroundColor: "#1F8978", elevation: 14 },
  tabButton: {
    height: 58,
    borderBottomWidth: 4,
  },
  tabButtonText: {
    fontSize: 20,
    width: tabBarButtonWidth,
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center",
  },
  buttonAddTab: {
    width: 32,
    height: 32,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
});

const contentFlatListStyles = StyleSheet.create({
  container: { backgroundColor: "#fcfcfc" },
  content: {
    width: windowWidth,
  },
});
