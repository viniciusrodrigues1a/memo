import { Board } from "../../entities/Board";

export interface IShowBoardRepository {
  show(name: string): Promise<Board | undefined>;
}
