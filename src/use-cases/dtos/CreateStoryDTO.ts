import { Status } from "../../entities";

export type CreateStoryDTO = {
  title: string;
  content: string;
  status: Status;
};
