import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Board, Status } from "../../entities";
import { ICreateBoardRepository } from "../../use-cases/repositories";

export class AsyncStorageCreateBoardRepository
  implements ICreateBoardRepository
{
  async create(name: string): Promise<Board> {
    const boardId = uuid();

    const board = {
      id: boardId,
      name,
    };

    const statuses = [
      {
        name: "todo",
        boardId,
        id: uuid(),
        colorHex: "#FF3300",
        stories: [],
      },
      {
        name: "doing",
        boardId,
        id: uuid(),
        colorHex: "#FFB300",
        stories: [],
      },
      {
        name: "done",
        boardId,
        id: uuid(),
        colorHex: "#95FF00",
        stories: [],
      },
    ];

    const storedBoards =
      JSON.parse((await AsyncStorage.getItem("@Memo:boards")) as string) || [];
    const storedStatuses =
      JSON.parse((await AsyncStorage.getItem("@Memo:statuses")) as string) ||
      [];

    const newBoards = storedBoards.concat([board]);
    const newStatuses = storedStatuses.concat([...statuses]);

    await AsyncStorage.setItem("@Memo:boards", JSON.stringify(newBoards));
    await AsyncStorage.setItem("@Memo:statuses", JSON.stringify(newStatuses));

    return {
      ...board,
      statuses: statuses as Status[],
    };
  }
}
