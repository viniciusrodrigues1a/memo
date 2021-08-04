import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useKeyboard } from "@react-native-community/hooks";
import Constants from "expo-constants";

import { showError } from "../../utils/toasts";
import { BoardAlreadyExistsError } from "../../../use-cases/errors";
import { Board } from "../../../entities";
import { createBoardUseCase } from "../../factories";

import EmptyFlatList from "../../components/EmptyFlatList";
import NoBoardFound from "./NoBoardFound";

import AddButton from "../../components/AddButton";
import { ServicesContext } from "../../contexts";
import { SearchingHeader } from "./SearchingHeader";

const DownTriangleImg = require("../../assets/down-triangle.png");
const AtSignImg = require("../../assets/at-sign.png");

const LayoutImg = require("../../assets/layout.png");

const contentHeight =
  Dimensions.get("window").height - Constants.statusBarHeight;

type BoardsState = {
  error: boolean;
  boards: Board[];
};

export default function Home() {
  const { listBoardService, createBoardService } = useContext(ServicesContext);

  const [isSearching, setIsSearching] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDataCached, setIsDataCached] = useState(false);
  const [allBoards, setAllBoards] = useState<Array<Board>>([]);
  const [filteredBoards, setFilteredBoards] = useState<Array<Board>>([]);
  const [boardName, setBoardName] = useState("");
  const [requestError, setRequestError] = useState(false);

  const navigation = useNavigation();
  const isPageFocused = useIsFocused();
  const keyboard = useKeyboard();

  function openModal() {
    setIsModalShown(true);
  }

  function closeModal() {
    setIsModalShown(false);
    setBoardName("");
  }

  const fetchBoards = useCallback(async () => {
    if (!isDataCached) {
      setLoading(true);
    }

    const serviceResponse = await listBoardService.list();

    setIsDataCached(!serviceResponse.error);
    setRequestError(serviceResponse.error);
    setAllBoards(serviceResponse.boards);
    setFilteredBoards(serviceResponse.boards);

    await new Promise((resolve) => setTimeout(resolve, 200));

    setLoading(false);
  }, [listBoardService, isDataCached]);

  useEffect(() => {
    if (isPageFocused) {
      fetchBoards();
    }
  }, [fetchBoards, isPageFocused]);

  const filterBoards = useCallback(
    (searchValue) => {
      const regexp = new RegExp(searchValue, "i");
      const filteredBoards = allBoards.filter((board) =>
        regexp.test(board.name)
      );

      setFilteredBoards(filteredBoards);
    },
    [allBoards]
  );

  async function createBoard() {
    if (boardName === "") {
      showError("Name can't be empty");
      return;
    }

    const serviceResponse = await createBoardService.handle(boardName);

    if (serviceResponse.error) {
      showError(serviceResponse.errorMessage!);
      return;
    }

    await fetchBoards();
    closeModal();
  }

  return (
    <View style={{ height: contentHeight }}>
      <View style={headerStyles.header}>
        {isSearching ? (
          <SearchingHeader
            onDebouncedEditing={filterBoards}
            onCancel={() => setIsSearching(false)}
          />
        ) : (
          <>
            <TouchableOpacity style={headerStyles.filterButton}>
              <Text style={headerStyles.filterText}>All memos</Text>
              <Image
                source={DownTriangleImg}
                style={headerStyles.filterImage}
              />
            </TouchableOpacity>

            <View style={headerStyles.options}>
              <TouchableOpacity
                style={headerStyles.optionButton}
                onPress={() => setIsSearching(true)}
              >
                <Text style={headerStyles.optionText}>SEARCH</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[headerStyles.optionButton, { marginLeft: 18 }]}
              >
                <Text style={headerStyles.optionText}>MORE</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#222222" size="large" />
        </View>
      ) : requestError ? (
        <NoBoardFound onPress={async () => fetchBoards()} />
      ) : filteredBoards.length === 0 ? (
        <EmptyFlatList
          buttonOnPress={openModal}
          buttonText="Create your first board"
          text="No board was found"
          imageSource={LayoutImg}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={filteredBoards}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Board", item)}
              style={[
                boardStyle.container,
                {
                  marginTop: index === 0 ? 36 : 16,
                  marginBottom: index === filteredBoards.length - 1 ? 36 : 16,
                },
              ]}
            >
              <Text style={boardStyle.title}>{item.name}</Text>

              <View style={boardStyle.statusesView}>
                {item.statuses.map((status, index) => (
                  <View style={boardStyle.statusView} key={index.toString()}>
                    <View
                      style={[
                        boardStyle.statusCircle,
                        {
                          backgroundColor: status.colorHex,
                          borderWidth: 1.5,
                          borderStyle: "solid",
                          borderColor: "#666",
                        },
                      ]}
                    />

                    <View style={boardStyle.statusTextView}>
                      <View style={boardStyle.statusTextSmallerView}>
                        <Text style={boardStyle.statusTextSmaller}>
                          {status.name.toUpperCase()}:{" "}
                        </Text>
                      </View>
                      <View>
                        <Text style={boardStyle.statusText}>
                          {status.stories.length}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {!loading && !requestError && (
        <AddButton
          onPress={openModal}
          style={{ elevation: isModalShown ? 0 : 12 }}
        />
      )}

      {isModalShown && (
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <View
            style={[
              addBoardStyles.modalContainer,
              {
                height: keyboard.keyboardShown
                  ? contentHeight - keyboard.keyboardHeight
                  : "100%",
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <View style={addBoardStyles.modalContent}>
                <Text style={addBoardStyles.modalTitle}>
                  Name your new{" "}
                  <Text style={{ color: "#067C69", fontWeight: "bold" }}>
                    board
                  </Text>
                </Text>

                <View style={addBoardStyles.modalInputView}>
                  <Image
                    source={AtSignImg}
                    style={addBoardStyles.modalInputIcon}
                  />
                  <TextInput
                    style={addBoardStyles.modalInput}
                    placeholder="My board"
                    value={boardName}
                    onChangeText={(text) => setBoardName(text)}
                  />
                </View>

                <View style={addBoardStyles.modalButtonView}>
                  <TouchableOpacity
                    onPress={() => closeModal()}
                    style={[
                      addBoardStyles.modalButton,
                      { backgroundColor: "#7C1F06" },
                    ]}
                  >
                    <Text style={addBoardStyles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => createBoard()}
                    style={[
                      addBoardStyles.modalButton,
                      { marginLeft: 18, backgroundColor: "#067C69" },
                    ]}
                  >
                    <Text style={addBoardStyles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "#067C69",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  filterButton: { flexDirection: "row", alignItems: "center" },
  filterText: { fontSize: 20, color: "#dddddd" },
  filterImage: { marginLeft: 8, marginTop: 2, width: 12, height: 12 },
  options: { flexDirection: "row" },
  optionButton: {},
  optionText: { fontSize: 16, color: "#dddddd", letterSpacing: 0.8 },
});

const boardStyle = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#222222",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 8,
  },
  title: {
    color: "#222222",
    fontSize: 26,
  },
  statusesView: {
    marginTop: 18,
  },
  statusView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  statusTextView: {
    flexDirection: "row",
    marginLeft: 8,
  },
  statusText: {
    fontSize: 22,
  },
  statusTextSmallerView: {
    alignSelf: "center",
  },
  statusTextSmaller: {
    fontSize: 18,
    color: "#777777",
  },
});

const addBoardStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fcfcfc",
    width: "90%",
    paddingVertical: 58,
    justifyContent: "center",
    alignItems: "center",
    elevation: 16,
    borderRadius: 6,
  },
  modalTitle: {
    fontSize: 24,
    textAlign: "center",
  },
  modalInputView: {
    borderColor: "#555555",
    borderWidth: 1,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    width: "80%",
    marginTop: 16,
    height: 50,
    position: "relative",
    borderRadius: 6,
  },
  modalInputIcon: {
    position: "absolute",
    top: 13,
    left: 12,
  },
  modalInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 46,
  },
  modalButtonView: {
    flexDirection: "row",
    marginTop: 56,
  },
  modalButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#dddddd",
    textTransform: "uppercase",
    fontSize: 16,
    letterSpacing: 0.75,
  },
});
