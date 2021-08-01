import { Board } from "../entities";
import { IShowBoardRepository } from "./repositories";
import { NoBoardFoundError } from "./errors";

export class ShowBoardUseCase {
  constructor(private showBoardRepository: IShowBoardRepository) {}

  async show(id: string): Promise<Board> {
    const board = await this.showBoardRepository.show(id);

    if (!board) {
      throw new NoBoardFoundError();
    }

    return board;
  }
}
