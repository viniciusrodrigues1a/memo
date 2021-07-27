import { Story } from "../../entities";

export interface IShowStoryRepository {
  show(id: string): Promise<Story | undefined>;
}
