import { Board } from "../../entities/Board";
import { IShowBoardRepository } from "../interfaces/IShowBoardRepository";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryShowBoardRepository implements IShowBoardRepository {
  show(name: string): Board | undefined {
    return inMemoryHelperArray.find((b) => b.name === name);
  }
}
