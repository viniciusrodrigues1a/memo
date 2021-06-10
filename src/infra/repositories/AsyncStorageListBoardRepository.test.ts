import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board } from "../../entities";
import { IListBoardRepository } from "../../use-cases/interfaces";

class AsyncStorageListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    const storedBoards = await AsyncStorage.getItem("@Memo:boards");
    const boards = JSON.parse(storedBoards as string);
    return boards;
  }
}

describe("List all Boards using AsyncStorage", () => {
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
});
