import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageCreateBoardRepository } from "./AsyncStorageCreateBoardRepository";
import { Board } from "../../entities";
import { IListBoardRepository } from "../../use-cases/interfaces";

class MockListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    return [];
  }
}

function makeSut() {
  const mockListBoardRepository = new MockListBoardRepository();
  const sut = new AsyncStorageCreateBoardRepository(mockListBoardRepository);

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
    const { sut, mockListBoardRepository } = makeSut();

    const boardId = "85d08a66-1e16-4cb6-879f-4339b7d46b9a";
    const olderBoard: Board = {
      id: boardId,
      name: "My first board",
      statuses: [
        {
          name: "todo",
          id: "status-id-0",
          colorHex: "#FF3300",
          stories: [],
        },
      ],
    };

    mockListBoardRepository.list = jest.fn(
      async (): Promise<Board[]> => [olderBoard]
    );

    await sut.create("My second board");

    const boards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedBoard = boards.find((b: Board) => b.name === olderBoard.name);
    expect(storedBoard.name).toEqual(olderBoard.name);
  });
});
