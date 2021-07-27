import { Board } from "../../entities/Board";

export interface IShowBoardRepository {
  show(id: string): Promise<Board | undefined>;
}
