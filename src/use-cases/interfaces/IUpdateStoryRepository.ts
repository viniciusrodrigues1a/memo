import { UpdateStoryDTO } from "../dtos";

export interface IUpdateStoryRepository {
  update({ title, content, storyId }: UpdateStoryDTO): Promise<void>;
}
