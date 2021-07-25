import { CreateStoryDTO } from "../dtos";

export interface ICreateStoryRepository {
  create({ title, content, boardId, statusId }: CreateStoryDTO): Promise<void>;
}
