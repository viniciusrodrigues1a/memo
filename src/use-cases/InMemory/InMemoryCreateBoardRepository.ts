import { v4 as uuid } from "uuid";
import { Board } from "../../entities";
import { ICreateBoardRepository } from "../repositories";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryCreateBoardRepository implements ICreateBoardRepository {
  async create(name: string): Promise<Board> {
    const boardId = uuid();
    const board: Board = {
      id: boardId,
      name,
      statuses: [
        {
          name: "todo",
          id: "status-id-1",
          colorHex: "#FF3300",
          stories: [],
        },
        {
          name: "doing",
          id: "status-id-2",
          colorHex: "#FFB300",
          stories: [],
        },
        {
          name: "done",
          id: "status-id-3",
          colorHex: "#95FF00",
          stories: [],
        },
      ],
    };

    inMemoryHelperArray.push(board);

    return board;
  }
}
