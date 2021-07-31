import { Board } from "../entities";
import { IListBoardRepository } from "./repositories";
import { NoBoardFoundError } from "./errors";
import { IListBoardUseCase } from "./IListBoardUseCase";

export class ListBoardUseCase implements IListBoardUseCase {
  constructor(private listBoardRepository: IListBoardRepository) {}

  async list(): Promise<Board[]> {
    const boards = await this.listBoardRepository.list();

    if (boards.length === 0) {
      throw new NoBoardFoundError();
    }

    return boards;
  }
}
