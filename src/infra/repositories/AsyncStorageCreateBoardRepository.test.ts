import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageCreateBoardRepository } from "./AsyncStorageCreateBoardRepository";

describe("Board creation using AsyncStorage", () => {
  it("should be able to store a Board", async () => {
    const sut = new AsyncStorageCreateBoardRepository();

    const board = await sut.create("My new board");

    const storedBoard = JSON.parse(
      (await AsyncStorage.getItem(board.id)) as string
    );
    expect(storedBoard.name).toEqual(board.name);
  });
});
