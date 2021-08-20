import { NoStoryFoundError } from "./errors";
import { IRemoveStoryRepository, IShowStoryRepository } from "./repositories";

export class RemoveStoryUseCase {
  public constructor(
    private showStoryRepository: IShowStoryRepository,
    private removeStoryRepository: IRemoveStoryRepository
  ) {}

  async remove(id: string): Promise<void> {
    const storyExists = await this.showStoryRepository.show(id);
    if (!storyExists) {
      throw new NoStoryFoundError();
    }

    await this.removeStoryRepository.remove(id);
  }
}
