import { ICreateStoryRepository } from "../interfaces";
import { CreateStoryDTO } from "../dtos";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryCreateStoryRepository implements ICreateStoryRepository {
  async create({
    title,
    content,
    boardId,
    statusId,
  }: CreateStoryDTO): Promise<void> {
    const status = inMemoryHelperArray
      .find((b) => b.id === boardId)
      ?.statuses.find((s) => s.id === statusId);

    status!.stories = status!.stories.concat([{ title, content }]);
  }
}
