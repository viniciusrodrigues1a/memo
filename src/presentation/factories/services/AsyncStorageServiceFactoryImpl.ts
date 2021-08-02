import {
  CreateBoardUseCase,
  CreateStoryUseCase,
  ListBoardUseCase,
  ShowBoardUseCase,
  UpdateStoryUseCase,
} from "../../../use-cases";
import {
  CreateBoardService,
  CreateStoryService,
  ListBoardService,
  ShowBoardService,
  UpdateStoryService,
} from "../../services";
import { IRepositoryFactory } from "../repositories";
import { IServiceFactory } from "./IServiceFactory";

export class AsyncStorageServiceFactoryImpl implements IServiceFactory {
  constructor(private repositoryFactory: IRepositoryFactory) {}

  makeUpdateStoryService(): UpdateStoryService {
    const updateStoryRepository =
      this.repositoryFactory.makeUpdateStoryRepository();
    const showStoryRepository =
      this.repositoryFactory.makeShowStoryRepository();
    const useCase = new UpdateStoryUseCase(
      updateStoryRepository,
      showStoryRepository
    );
    const service = new UpdateStoryService(useCase);

    return service;
  }

  makeCreateStoryService(): CreateStoryService {
    const createStoryRepository =
      this.repositoryFactory.makeCreateStoryRepository();
    const showStatusRepository =
      this.repositoryFactory.makeShowStatusRepository();
    const useCase = new CreateStoryUseCase(
      createStoryRepository,
      showStatusRepository
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
