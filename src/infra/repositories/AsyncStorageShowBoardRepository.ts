import { Board } from "../../entities";
import {
  IShowBoardRepository,
  IListBoardRepository,
} from "../../use-cases/repositories";

export class AsyncStorageShowBoardRepository implements IShowBoardRepository {
  constructor(private listBoardRepository: IListBoardRepository) {}

  async show(name: string): Promise<Board | undefined> {
    const boards = await this.listBoardRepository.list();
    const board = boards.find((b) => b.name === name);

    return board;
  }
}
