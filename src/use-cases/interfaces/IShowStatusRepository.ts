import { Status } from "../../entities";

export interface IShowStatusRepository {
  show(id: string): Promise<Status | undefined>;
}
