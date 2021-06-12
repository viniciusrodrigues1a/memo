import { CreateStoryDTO } from "./dtos";
import { ICreateStoryRepository, IShowBoardRepository } from "./interfaces";
import { InvalidStatusError } from "./errors";

export class CreateStoryUseCase {
  constructor(
    private createStoryRepository: ICreateStoryRepository,
    private showBoardRepository: IShowBoardRepository
  ) {}

  async create({ title, content, status }: CreateStoryDTO): Promise<void> {
    const board = await this.showBoardRepository.show(status.boardId);

    if (!board) {
      throw new InvalidStatusError(status.name);
    }

    await this.createStoryRepository.create({ title, content, status });
  }
}
