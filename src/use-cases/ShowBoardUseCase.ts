import { Board } from "../entities";
import { IListBoardRepository } from "./interfaces";
import { BoardNotFoundError } from "./errors";

export class ShowBoardUseCase {
  constructor(private listBoardRepository: IListBoardRepository) {}

  async show(name: string): Promise<Board> {
    const boards = await this.listBoardRepository.list();

    const board = boards.find((b) => b.name === name);

    if (!board) {
      throw new BoardNotFoundError(name);
    }

    return board;
  }
}
