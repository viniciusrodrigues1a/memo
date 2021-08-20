import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
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
  BackHandler,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Status } from "../../../entities/Status";

import { StackParamList } from "../../routes/StackNavigation";

import AddButton from "../../components/AddButton";
import { Card } from "./Card";
import { ServicesContext } from "../../contexts";
import EmptyFlatList from "../../components/EmptyFlatList";

import EmptyStoryImg from "../../assets/empty-story.png";
import { Story } from "../../../entities";
import { SelectAll } from "./SelectAll";
import { SelectedItem } from "./SelectedItem";
import ErrorMessage from "../../components/ErrorMessage";

const windowWidth = Dimensions.get("window").width;
const tabBarButtonWidth = Math.floor(windowWidth / 3);

export default function Board() {
  const { showBoardService, removeStoryService } = useContext(ServicesContext);
  const [contentIndex, setContentIndex] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isSelectingForDeletion, setIsSelectingForDeletion] = useState(false);
  const [storiesToDelete, setStoriesToDelete] = useState<Array<string>>([]);
  const [requestError, setRequestError] = useState(false);
  const isFocused = useIsFocused();

  const route = useRoute<RouteProp<StackParamList, "Board">>();
  const navigation = useNavigation();

  const contentFlatListRef = useRef(null);
  const tabBarFlatListRef = useRef(null);

  useEffect(() => {
    function handleBackEvent() {
      if (isSelectingForDeletion) {
        setIsSelectingForDeletion(false);
        return true;
      }

      return false;
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackEvent);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackEvent);
  }, [isSelectingForDeletion]);

  const fetchStatuses = useCallback(async () => {
    const serviceResponse = await showBoardService.handle(
      `${route.params.name}`
    );

    setRequestError(serviceResponse.error);
    if (serviceResponse.board) {
      setStatuses(serviceResponse.board.statuses);
    }
  }, [route.params.name, showBoardService]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses, isFocused]);

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

  function goToStoryCreationPage() {
    navigation.navigate("CreateStory", {
      boardId: route.params.id,
      statusId: route.params.statuses[contentIndex].id,
    });
  }

  function handleCardPress(story: Story) {
    if (isSelectingForDeletion) {
      toggleStoryFromDeletionArray(story.id);
    } else {
      goToStoryPage(story);
    }
  }

  function goToStoryPage(story: Story) {
    navigation.navigate("Story", story);
  }

  function handleCardLongPress(story: Story) {
    setIsSelectingForDeletion(true);
    addStoryToDeletionArray(story.id);
  }

  function toggleStoryFromDeletionArray(id: string) {
    if (isStoryBeingDeleted(id)) {
      removeStoryFromDeletionArray(id);
    } else {
      addStoryToDeletionArray(id);
    }
  }

  function addStoryToDeletionArray(id: string) {
    if (isStoryBeingDeleted(id)) {
      return;
    }

    const newStories = storiesToDelete.concat([id]);
    setStoriesToDelete(newStories);
  }

  function isStoryBeingDeleted(id: string): boolean {
    const storyAlreadyInArray = storiesToDelete.indexOf(id) !== -1;
    if (storyAlreadyInArray) {
      return true;
    }

    return false;
  }

  function removeStoryFromDeletionArray(id: string) {
    const filteredStories = storiesToDelete.filter((s) => s !== id);
    setStoriesToDelete(filteredStories);
  }

  function handleSelectAll() {
    const { stories } = statuses[contentIndex];

    const areAllStoriesBeingDeleted = stories.length === storiesToDelete.length;

    if (areAllStoriesBeingDeleted) {
      setStoriesToDelete([]);
    } else {
      setStoriesToDelete(stories.map((s) => s.id));
    }
  }

  function handleHeaderButton() {
    if (isSelectingForDeletion) {
      storiesToDelete.forEach((storyId) => removeStoryService.handle(storyId));
      setIsSelectingForDeletion(false);
      fetchStatuses();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={headerStyles.container}>
        <View style={headerStyles.selectAll}>
          {isSelectingForDeletion && (
            <SelectAll
              count={storiesToDelete.length}
              countLimit={statuses[contentIndex].stories.length}
              onSelectAll={handleSelectAll}
            />
          )}
        </View>
        <TouchableOpacity onPress={handleHeaderButton}>
          <Text style={headerStyles.searchText}>
            {isSelectingForDeletion ? "DELETE" : "SEARCH"}
          </Text>
        </TouchableOpacity>
      </View>

      {requestError ? (
        <ErrorMessage onPress={() => {}} />
      ) : (
        <>
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
                        {
                          color: index === contentIndex ? "#ffffff" : "#cccccc",
                        },
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
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            horizontal
            keyExtractor={(_, index) => index.toString()}
            data={statuses}
            renderItem={({ item: status }) => (
              <View style={contentFlatListStyles.content}>
                {status.stories.length === 0 ? (
                  <EmptyFlatList
                    buttonOnPress={goToStoryCreationPage}
                    buttonText="Create a story"
                    text="No story was found"
                    imageSource={EmptyStoryImg}
                  />
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(i) => i.id}
                    data={status.stories}
                    renderItem={({ item: story }) => (
                      <View style={contentFlatListStyles.cardWrapper}>
                        {isSelectingForDeletion && (
                          <TouchableOpacity
                            onPress={() => handleCardPress(story)}
                            style={contentFlatListStyles.selectedItemWrapper}
                          >
                            <SelectedItem
                              checked={storiesToDelete.indexOf(story.id) !== -1}
                              theme="dark"
                            />
                          </TouchableOpacity>
                        )}
                        <Card
                          story={story}
                          onPress={() => handleCardPress(story)}
                          onLongPress={() => handleCardLongPress(story)}
                        />
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          />

          <AddButton onPress={goToStoryCreationPage} />
        </>
      )}
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#067C69",
    height: 60,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    elevation: 14,
  },
  selectAll: { marginLeft: 16 },
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
  cardWrapper: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedItemWrapper: {
    paddingRight: 16,
    height: "100%",
    justifyContent: "center",
  },
});
