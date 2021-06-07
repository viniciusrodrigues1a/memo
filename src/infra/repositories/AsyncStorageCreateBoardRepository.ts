import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board } from "../../entities";
import { ICreateBoardRepository } from "../../use-cases/interfaces";

export class AsyncStorageCreateBoardRepository
  implements ICreateBoardRepository
{
  async create(name: string): Promise<Board> {
    const boardId = uuid();
    const board: Board = {
      id: boardId,
      name,
      statuses: [
        {
          name: "todo",
          boardId,
          colorHex: "#FF3300",
          stories: [],
        },
        {
          name: "doing",
          boardId,
          colorHex: "#FFB300",
          stories: [],
        },
        {
          name: "done",
          boardId,
          colorHex: "#95FF00",
          stories: [],
        },
      ],
    };

    await AsyncStorage.setItem(boardId, JSON.stringify(board));

    return board;
  }
}
