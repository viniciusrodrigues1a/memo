import { Board } from "../../entities";
import { IListBoardRepository } from "../interfaces";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    return inMemoryHelperArray;
  }
}
