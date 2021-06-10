import { Board } from "../entities";
import { IShowBoardRepository } from "./interfaces";
import { BoardNotFoundError } from "./errors";

export class ShowBoardUseCase {
  constructor(private showBoardRepository: IShowBoardRepository) {}

  async show(name: string): Promise<Board> {
    const board = await this.showBoardRepository.show(name);

    if (!board) {
      throw new BoardNotFoundError(name);
    }

    return board;
  }
}
