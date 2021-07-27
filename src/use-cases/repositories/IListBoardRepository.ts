import { Board } from "../../entities";

export interface IListBoardRepository {
  list(): Promise<Board[]>;
}
