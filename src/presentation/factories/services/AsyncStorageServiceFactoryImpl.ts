import { CreateBoardUseCase, ListBoardUseCase } from "../../../use-cases";
import { CreateBoardService, ListBoardService } from "../../services";
import {
  AsyncStorageCreateBoardRepositoryFactory,
  AsyncStorageListBoardRepositoryFactory,
  AsyncStorageShowBoardRepositoryFactory,
} from "../repositories/AsyncStorage";
import { IServiceFactory } from "./IServiceFactory";

export class AsyncStorageServiceFactoryImpl implements IServiceFactory {
  makeCreateBoardService(): CreateBoardService {
    const createBoardRepository =
      AsyncStorageCreateBoardRepositoryFactory.make();
    const showBoardRepository = AsyncStorageShowBoardRepositoryFactory.make();
    const useCase = new CreateBoardUseCase(
      createBoardRepository,
      showBoardRepository
    );
    const service = new CreateBoardService(useCase);

    return service;
  }

  makeListBoardService(): ListBoardService {
    const listBoardRepository = AsyncStorageListBoardRepositoryFactory.make();
    const useCase = new ListBoardUseCase(listBoardRepository);
    const service = new ListBoardService(useCase);

    return service;
  }
}
