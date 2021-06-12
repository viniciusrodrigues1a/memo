import { ICreateStoryRepository } from "../interfaces";
import { CreateStoryDTO } from "../dtos";

export class InMemoryCreateStoryRepository implements ICreateStoryRepository {
  async create({ title, content, status }: CreateStoryDTO): Promise<void> {
    // eslint-disable-next-line no-param-reassign
    status.stories = [{ title, content }];
  }
}
