import { CreateStoryDTO } from "../dtos";

export interface ICreateStoryRepository {
  create({ title, content, status }: CreateStoryDTO): Promise<void>;
}
