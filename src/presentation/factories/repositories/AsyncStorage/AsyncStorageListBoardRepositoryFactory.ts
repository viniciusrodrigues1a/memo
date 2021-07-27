import { AsyncStorageListBoardRepository } from "../../../../infra/repositories";

export class AsyncStorageListBoardRepositoryFactory {
  public static make() {
    return new AsyncStorageListBoardRepository();
  }
}
