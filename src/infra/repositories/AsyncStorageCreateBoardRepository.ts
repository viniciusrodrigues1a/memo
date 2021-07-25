import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board } from "../../entities";
import {
  ICreateBoardRepository,
  IListBoardRepository,
} from "../../use-cases/interfaces";

export class AsyncStorageCreateBoardRepository
  implements ICreateBoardRepository
{
  constructor(private listBoardRepository: IListBoardRepository) {}

  async create(name: string): Promise<Board> {
    const boardId = uuid();
    const board: Board = {
      id: boardId,
      name,
      statuses: [
        {
          name: "todo",
          id: uuid(),
          colorHex: "#FF3300",
          stories: [],
        },
        {
          name: "doing",
          id: uuid(),
          colorHex: "#FFB300",
          stories: [],
        },
        {
          name: "done",
          id: uuid(),
          colorHex: "#95FF00",
          stories: [],
        },
      ],
    };

    const repositories = await this.listBoardRepository.list();
    const boards = repositories.concat([board]);
    await AsyncStorage.setItem("@Memo:boards", JSON.stringify(boards));

    return board;
  }
}
