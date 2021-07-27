import { AsyncStorageCreateBoardRepository } from "../../../../infra/repositories";

export class AsyncStorageCreateBoardRepositoryFactory {
  public static make() {
    return new AsyncStorageCreateBoardRepository();
  }
}
