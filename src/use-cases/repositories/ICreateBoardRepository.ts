import { Board } from "../../entities";

export interface ICreateBoardRepository {
  create(name: string): Promise<Board>;
}
