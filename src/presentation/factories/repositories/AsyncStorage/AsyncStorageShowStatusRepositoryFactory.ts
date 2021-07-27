import { AsyncStorageShowStatusRepository } from "../../../../infra/repositories";

export class AsyncStorageShowStatusRepositoryFactory {
  public static make() {
    return new AsyncStorageShowStatusRepository();
  }
}
