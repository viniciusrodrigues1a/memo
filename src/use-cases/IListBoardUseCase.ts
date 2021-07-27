import { Board } from "../entities";

export interface IListBoardUseCase {
  list(): Promise<Board[]>;
}
