import { v4 as uuid } from "uuid";
import { Board } from "../../entities";
import { ICreateBoardRepository } from "../interfaces";
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

    inMemoryHelperArray.push(board);

    return board;
  }
}
