import { ICreateBoardRepository, IShowBoardRepository } from "./interfaces";
import { BoardAlreadyExistsError } from "./errors";

export class CreateBoardUseCase {
  constructor(
    private createBoardRepository: ICreateBoardRepository,
    private showBoardRepository: IShowBoardRepository
  ) {}

  create(name: string) {
    const boardAlreadyExists = this.showBoardRepository.show(name);
    if (boardAlreadyExists) {
      throw new BoardAlreadyExistsError(name);
    }

    this.createBoardRepository.create(name);
  }
}
