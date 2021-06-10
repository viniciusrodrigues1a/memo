import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageCreateBoardRepository } from "./AsyncStorageCreateBoardRepository";
import { Board } from "../../entities";

describe("Board creation using AsyncStorage", () => {
  it("should be able to store a Board", async () => {
    const sut = new AsyncStorageCreateBoardRepository();

    const board = await sut.create("My new board");

    const boards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedBoard = boards.find((b: Board) => b.name === board.name);
    expect(storedBoard.name).toEqual(board.name);
  });
});
