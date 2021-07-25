import { Status } from "../../entities";

export type CreateStoryDTO = {
  title: string;
  content: string;
  boardId: string;
  statusId: string;
};
