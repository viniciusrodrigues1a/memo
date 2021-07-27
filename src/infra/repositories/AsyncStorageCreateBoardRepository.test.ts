import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageCreateBoardRepository } from "./AsyncStorageCreateBoardRepository";
import { Board } from "../../entities";
import { IListBoardRepository } from "../../use-cases/repositories";

class MockListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    return [];
  }
}

function makeSut() {
  const mockListBoardRepository = new MockListBoardRepository();
  const sut = new AsyncStorageCreateBoardRepository();

  return { sut, mockListBoardRepository };
}

describe("Board creation using AsyncStorage", () => {
  it("should be able to store a Board", async () => {
    const { sut } = makeSut();

    const board = await sut.create("My new board");

    const boards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedBoard = boards.find((b: Board) => b.name === board.name);
    expect(storedBoard.name).toEqual(board.name);
  });

  it("should NOT remove other Boards when adding a new one", async () => {
    const { sut } = makeSut();

    const olderBoardName = "My first board";

    await sut.create(olderBoardName);
    await sut.create("My second board");

    const boards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedBoard = boards.find((b: Board) => b.name === olderBoardName);
    expect(storedBoard.name).toEqual(olderBoardName);
  });
});
