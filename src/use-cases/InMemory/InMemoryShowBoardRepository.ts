import { Board } from "../../entities";
import { IShowBoardRepository } from "../interfaces/IShowBoardRepository";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryShowBoardRepository implements IShowBoardRepository {
  async show(name: string): Promise<Board | undefined> {
    return inMemoryHelperArray.find((b) => b.name === name);
  }
}
