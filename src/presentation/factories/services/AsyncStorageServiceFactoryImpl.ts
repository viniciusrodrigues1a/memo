import {
  CreateBoardUseCase,
  CreateStoryUseCase,
  ListBoardUseCase,
  ShowBoardUseCase,
} from "../../../use-cases";
import {
  CreateBoardService,
  CreateStoryService,
  ListBoardService,
  ShowBoardService,
} from "../../services";
import { IRepositoryFactory } from "../repositories";
import { IServiceFactory } from "./IServiceFactory";

export class AsyncStorageServiceFactoryImpl implements IServiceFactory {
  constructor(private repositoryFactory: IRepositoryFactory) {}

  makeCreateStoryService(): CreateStoryService {
    const createStoryRepository =
      this.repositoryFactory.makeCreateStoryRepository();
    const showStoryRepository =
      this.repositoryFactory.makeShowStoryRepository();
    const useCase = new CreateStoryUseCase(
      createStoryRepository,
      showStoryRepository
    );
    const service = new CreateStoryService(useCase);

    return service;
  }

  makeShowBoardService(): ShowBoardService {
    const showBoardRepository =
      this.repositoryFactory.makeShowBoardRepository();
    const useCase = new ShowBoardUseCase(showBoardRepository);
    const service = new ShowBoardService(useCase);

    return service;
  }

  makeCreateBoardService(): CreateBoardService {
    const createBoardRepository =
      this.repositoryFactory.makeCreateBoardRepository();
    const showBoardRepository =
      this.repositoryFactory.makeShowBoardRepository();
    const useCase = new CreateBoardUseCase(
      createBoardRepository,
      showBoardRepository
    );
    const service = new CreateBoardService(useCase);

    return service;
  }

  makeListBoardService(): ListBoardService {
    const listBoardRepository =
      this.repositoryFactory.makeListBoardRepository();
    const useCase = new ListBoardUseCase(listBoardRepository);
    const service = new ListBoardService(useCase);

    return service;
  }
}
