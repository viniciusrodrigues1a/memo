import {
  AsyncStorageCreateBoardRepository,
  AsyncStorageCreateStoryRepository,
  AsyncStorageListBoardRepository,
  AsyncStorageShowBoardRepository,
  AsyncStorageShowStatusRepository,
  AsyncStorageShowStoryRepository,
  AsyncStorageUpdateStoryRepository,
} from "../../../infra/repositories";
import {
  ICreateBoardRepository,
  IListBoardRepository,
  IShowBoardRepository,
  ICreateStoryRepository,
  IUpdateStoryRepository,
  IShowStoryRepository,
  IShowStatusRepository,
} from "../../../use-cases/repositories";
import { IRepositoryFactory } from "./IRepositoryFactory";

export class AsyncStorageRepositoryFactoryImpl implements IRepositoryFactory {
  makeCreateBoardRepository(): ICreateBoardRepository {
    return new AsyncStorageCreateBoardRepository();
  }

  makeListBoardRepository(): IListBoardRepository {
    return new AsyncStorageListBoardRepository();
  }

  makeShowBoardRepository(): IShowBoardRepository {
    return new AsyncStorageShowBoardRepository(this.makeListBoardRepository());
  }

  makeCreateStoryRepository(): ICreateStoryRepository {
    return new AsyncStorageCreateStoryRepository();
  }

  makeUpdateStoryRepository(): IUpdateStoryRepository {
    return new AsyncStorageUpdateStoryRepository();
  }

  makeShowStoryRepository(): IShowStoryRepository {
    return new AsyncStorageShowStoryRepository();
  }

  makeShowStatusRepository(): IShowStatusRepository {
    return new AsyncStorageShowStatusRepository();
  }
}
