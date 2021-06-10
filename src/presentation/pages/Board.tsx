import React, { useRef, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const tabBarButtonWidth = Math.floor(windowWidth / 3);

export default function Board() {
  const [contentIndex, setContentIndex] = useState(0);

  const contentFlatListRef = useRef(null);
  const tabBarFlatListRef = useRef(null);

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
      <View style={header.container}>
        <TouchableOpacity>
          <Text style={header.searchText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 58 }}>
        <FlatList
          ref={tabBarFlatListRef}
          style={tabFlatList.container}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.name}
          data={[
            { name: "TODO" },
            { name: "DOING" },
            { name: "DONE" },
            { name: "TESTING" },
            { name: "READY" },
          ]}
          renderItem={({ item, index }) => (
            <>
              <TouchableOpacity
                onPress={() =>
                  contentFlatListRef.current.scrollToOffset({
                    offset: windowWidth * contentIndex,
                  })
                }
                style={[
                  tabFlatList.tabButton,
                  {
                    borderBottomColor:
                      index === contentIndex ? "#ffffff" : "#4A9C8F",
                  },
                ]}
              >
                <Text
                  style={[
                    tabFlatList.tabButtonText,
                    { color: index === contentIndex ? "#ffffff" : "#cccccc" },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>

              {index === 4 && (
                <TouchableOpacity style={tabFlatList.buttonAddTab}>
                  <Feather name="plus" color="#1F8978" size={28} />
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>

      <FlatList
        ref={contentFlatListRef}
        style={contentFlatList.container}
        decelerationRate="fast"
        snapToInterval={windowWidth}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        data={[
          [
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
          ],
          [
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
            { name: "Todo task", expirationDate: "Vence em 4 dias" },
          ],
          [{ name: "Todo task", expirationDate: "Vence em 4 dias" }],
          [{ name: "Todo task", expirationDate: "Vence em 4 dias" }],
          [{ name: "Todo task", expirationDate: "Vence em 4 dias" }],
        ]}
        renderItem={({ item }) => (
          <View style={contentFlatList.content}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              data={item}
              renderItem={({ item: story }) => (
                <View style={contentFlatList.story}>
                  <Text style={contentFlatList.storyTitle}>{story.name}</Text>

                  <Text style={contentFlatList.storyDate}>
                    {story.expirationDate}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

const header = StyleSheet.create({
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

const tabFlatList = StyleSheet.create({
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

const contentFlatList = StyleSheet.create({
  container: { backgroundColor: "#fcfcfc" },
  content: {
    width: windowWidth,
  },
  story: {
    backgroundColor: "#f9f9f9",
    margin: 16,
    padding: 24,
    borderRadius: 4,
    elevation: 10,
  },
  storyTitle: {
    fontSize: 26,
    color: "#222222",
  },
  storyDate: {
    marginTop: 42,
    fontSize: 14,
    color: "#888888",
  },
});
