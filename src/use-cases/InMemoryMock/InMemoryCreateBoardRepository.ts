import { ICreateBoardRepository } from "../interfaces";
import { inMemoryHelperArray } from "./inMemoryHelperArray";

export class InMemoryCreateBoardRepository implements ICreateBoardRepository {
  create(name: string): void {
    inMemoryHelperArray.push({ name, stories: [] });
  }
}
