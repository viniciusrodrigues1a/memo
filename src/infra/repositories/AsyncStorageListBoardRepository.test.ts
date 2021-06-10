import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board } from "../../entities";
import { IListBoardRepository } from "../../use-cases/interfaces";

class AsyncStorageListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    const storedBoards = await AsyncStorage.getItem("@Memo:boards");

    if (!storedBoards) {
      return [];
    }

    const boards = JSON.parse(storedBoards);

    return boards;
  }
}

describe("List all Boards using AsyncStorage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:boards");
  });

  it("should be able to list stored Boards", async () => {
    const sut = new AsyncStorageListBoardRepository();
    await AsyncStorage.setItem(
      "@Memo:boards",
      JSON.stringify([
        {
          id: "fce54dcf-795f-4253-b719-bfb131ee71d8",
          name: "My board",
          statuses: [
            {
              name: "todo",
              boardId: "fce54dcf-795f-4253-b719-bfb131ee71d8",
              colorHex: "#FF3300",
              stories: [],
            },
          ],
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
