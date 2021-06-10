import { ICreateBoardRepository, IShowBoardRepository } from "./interfaces";
import {
  BoardAlreadyExistsError,
  BoardNameExceedsMaximumLength,
} from "./errors";

export class CreateBoardUseCase {
  constructor(
    private createBoardRepository: ICreateBoardRepository,
    private showBoardRepository: IShowBoardRepository
  ) {}

  async create(name: string) {
    const boardAlreadyExists = await this.showBoardRepository.show(name);
    if (boardAlreadyExists) {
      throw new BoardAlreadyExistsError(name);
    }

    const maximumLength = 32;
    if (name.length > maximumLength) {
      throw new BoardNameExceedsMaximumLength(maximumLength);
    }

    this.createBoardRepository.create(name);
  }
}
