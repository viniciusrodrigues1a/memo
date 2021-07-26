import { ICreateStoryRepository } from "../interfaces";
import { CreateStoryDTO } from "../dtos";
import { inMemoryHelperArray } from "./inMemoryHelperArray";
import { Status } from "../../entities";

export class InMemoryCreateStoryRepository implements ICreateStoryRepository {
  async create({ title, content, statusId }: CreateStoryDTO): Promise<void> {
    let status: Status;

    for (let i = 0; i < inMemoryHelperArray.length; i++) {
      const board = inMemoryHelperArray[i];
      const statusFound = board.statuses.find((s) => s.id === statusId);

      if (statusFound) {
        status = statusFound;
        break;
      }
    }

    status!.stories = status!.stories.concat([{ title, content }]);
  }
}
