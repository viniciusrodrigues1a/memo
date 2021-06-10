import { Board } from "../entities";
import { IListBoardRepository } from "./interfaces";
import { NoBoardFoundError } from "./errors";

export class ListBoardUseCase {
  constructor(private listBoardRepository: IListBoardRepository) {}

  async list(): Promise<Board[]> {
    const boards = await this.listBoardRepository.list();

    if (boards.length === 0) {
      throw new NoBoardFoundError();
    }

    return boards;
  }
}
