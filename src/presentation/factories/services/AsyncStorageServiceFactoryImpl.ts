import { ListBoardUseCase } from "../../../use-cases";
import { ListBoardService } from "../../services";
import { AsyncStorageListBoardRepositoryFactory } from "../repositories/AsyncStorage";
import { IServiceFactory } from "./IServiceFactory";

export class AsyncStorageServiceFactoryImpl implements IServiceFactory {
  makeListBoardService(): ListBoardService {
    const listBoardRepository = AsyncStorageListBoardRepositoryFactory.make();
    const useCase = new ListBoardUseCase(listBoardRepository);
    const service = new ListBoardService(useCase);

    return service;
  }
}
