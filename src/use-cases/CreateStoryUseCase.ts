import { CreateStoryDTO } from "./dtos";
import { ICreateStoryRepository, IShowStatusRepository } from "./repositories";
import { InvalidStatusError } from "./errors";

export class CreateStoryUseCase {
  constructor(
    private createStoryRepository: ICreateStoryRepository,
    private showStatusRepository: IShowStatusRepository
  ) {}

  async create({ title, content, statusId }: CreateStoryDTO): Promise<void> {
    const status = await this.showStatusRepository.show(statusId);

    if (!status) {
      throw new InvalidStatusError(statusId);
    }

    await this.createStoryRepository.create({
      title,
      content,
      statusId,
    });
  }
}
