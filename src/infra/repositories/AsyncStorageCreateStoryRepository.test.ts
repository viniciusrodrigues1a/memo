import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board } from "../../entities";
import { AsyncStorageCreateStoryRepository } from "./AsyncStorageCreateStoryRepository";

describe("Story creation repository using Async Storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:boards");
  });

  it("should be able to create a story", async () => {
    // given
    const sut = new AsyncStorageCreateStoryRepository();

    const boardId = "6b3ca6a7-2073-424b-8c0c-e1eed1c30b67";
    const status = {
      name: "todo",
      id: "status-id-0",
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };

    await AsyncStorage.setItem(
      "@Memo:boards",
      JSON.stringify([
        {
          id: boardId,
          name: "My board",
          statuses: [status],
        },
      ])
    );

    // when
    await sut.create({
      title: "Studying",
      content: "Finish math homework",
      boardId,
      statusId: status.id,
    });

    // then
    const boards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedBoard = boards.find((b: Board) => b.id === boardId);
    expect(storedBoard.statuses[0].stories[0].content).toEqual(
      "Finish math homework"
    );
  });

  it("should persist previous values", async () => {
    // given
    const sut = new AsyncStorageCreateStoryRepository();

    const boardId = "6b3ca6a7-2073-424b-8c0c-e1eed1c30b67";
    const status = {
      name: "todo",
      id: "status-id-1",
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };

    await AsyncStorage.setItem(
      "@Memo:boards",
      JSON.stringify([
        {
          id: boardId,
          name: "My board",
          statuses: [status],
        },
      ])
    );

    // when
    await sut.create({
      title: "Studying",
      content: "Finish math homework",
      boardId,
      statusId: status.id,
    });

    await sut.create({
      title: "Exercising",
      content: "Do 20 push ups",
      boardId,
      statusId: status.id,
    });

    // then
    const boards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedBoard = boards.find((b: Board) => b.id === boardId);
    expect(storedBoard.statuses[0].stories[0].content).toEqual(
      "Finish math homework"
    );
  });
});
