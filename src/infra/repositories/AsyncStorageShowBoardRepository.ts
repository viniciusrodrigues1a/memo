import { Board } from "../../entities";
import {
  IShowBoardRepository,
  IListBoardRepository,
} from "../../use-cases/interfaces";

export class AsyncStorageShowBoardRepository implements IShowBoardRepository {
  constructor(private listBoardRepository: IListBoardRepository) {}

  async show(id: string): Promise<Board | undefined> {
    const boards = await this.listBoardRepository.list();
    const board = boards.find((b) => b.id === id);

    return board;
  }
}
