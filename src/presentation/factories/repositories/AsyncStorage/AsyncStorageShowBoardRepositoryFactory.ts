import { AsyncStorageShowBoardRepository } from "../../../../infra/repositories";
import { AsyncStorageListBoardRepositoryFactory } from "./AsyncStorageListBoardRepositoryFactory";

export class AsyncStorageShowBoardRepositoryFactory {
  public static make() {
    return new AsyncStorageShowBoardRepository(
      AsyncStorageListBoardRepositoryFactory.make()
    );
  }
}
