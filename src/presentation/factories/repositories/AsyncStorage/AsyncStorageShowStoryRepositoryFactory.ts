import { AsyncStorageShowStoryRepository } from "../../../../infra/repositories";

export class AsyncStorageShowStoryRepositoryFactory {
  public static make() {
    return new AsyncStorageShowStoryRepository();
  }
}
