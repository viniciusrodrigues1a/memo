import { AsyncStorageUpdateStoryRepository } from "../../../../infra/repositories";

export class AsyncStorageUpdateStoryRepositoryFactory {
  public static make() {
    return new AsyncStorageUpdateStoryRepository();
  }
}
