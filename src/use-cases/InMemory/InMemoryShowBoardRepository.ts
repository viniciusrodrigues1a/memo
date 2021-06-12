import { Board } from "../../entities";
import { IShowBoardRepository } from "../interfaces/IShowBoardRepository";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryShowBoardRepository implements IShowBoardRepository {
  async show(id: string): Promise<Board | undefined> {
    return inMemoryHelperArray.find((b) => b.id === id);
  }
}
