import { CreateStoryDTO } from "./dtos";
import { ICreateStoryRepository, IShowBoardRepository } from "./interfaces";
import { InvalidStatusError } from "./errors";

export class CreateStoryUseCase {
  constructor(
    private createStoryRepository: ICreateStoryRepository,
    private showBoardRepository: IShowBoardRepository
  ) {}

  async create({
    title,
    content,
    boardId,
    statusId,
  }: CreateStoryDTO): Promise<void> {
    const board = await this.showBoardRepository.show(boardId);

    if (!board) {
      throw new InvalidStatusError(statusId);
    }

    await this.createStoryRepository.create({
      title,
      content,
      boardId,
      statusId,
    });
  }
}
