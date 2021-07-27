import { AsyncStorageCreateStoryRepository } from "../../../../infra/repositories";

export class AsyncStorageCreateStoryRepositoryFactory {
  public static make() {
    return new AsyncStorageCreateStoryRepository();
  }
}
