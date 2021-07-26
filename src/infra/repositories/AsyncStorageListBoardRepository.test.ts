import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageListBoardRepository } from "./AsyncStorageListBoardRepository";

describe("List all Boards using AsyncStorage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:boards");
    await AsyncStorage.removeItem("@Memo:statuses");
    await AsyncStorage.removeItem("@Memo:stories");
  });

  it("should be able to list stored Boards", async () => {
    const sut = new AsyncStorageListBoardRepository();
    const boardId = "fce54dcf-795f-4253-b719-bfb131ee71d8";
    await AsyncStorage.setItem(
      "@Memo:boards",
      JSON.stringify([
        {
          id: boardId,
          name: "My board",
        },
      ])
    );
    await AsyncStorage.setItem(
      "@Memo:statuses",
      JSON.stringify([
        {
          name: "todo",
          boardId,
          id: "status-id-0",
          colorHex: "#FF3300",
          stories: [],
        },
      ])
    );

    const boards = await sut.list();

    const boardsNames = boards.map((b) => b.name);
    expect(boardsNames).toContain("My board");
  });

  it("should return empty array if there is no Board stored", async () => {
    const sut = new AsyncStorageListBoardRepository();

    const boards = await sut.list();

    expect(boards.length).toBe(0);
  });
});
