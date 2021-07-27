import { Board } from "../entities";
import { IShowBoardRepository } from "./repositories";
import { BoardNotFoundError } from "./errors";

export class ShowBoardUseCase {
  constructor(private showBoardRepository: IShowBoardRepository) {}

  async show(id: string): Promise<Board> {
    const board = await this.showBoardRepository.show(id);

    if (!board) {
      throw new BoardNotFoundError(id);
    }

    return board;
  }
}
