import { UpdateStoryDTO } from "./dtos";
import { NoStoryFoundError } from "./errors";
import { IShowStoryRepository, IUpdateStoryRepository } from "./repositories";

class UpdateStoryUseCase {
  constructor(
    private updateStoryRepository: IUpdateStoryRepository,
    private showStoryRepository: IShowStoryRepository
  ) {}

  async update({ storyId, title, content }: UpdateStoryDTO): Promise<void> {
    const story = await this.showStoryRepository.show(storyId);

    if (!story) {
      throw new NoStoryFoundError();
    }

    await this.updateStoryRepository.update({
      title,
      content,
      storyId,
    });
  }
}

export { UpdateStoryUseCase };
