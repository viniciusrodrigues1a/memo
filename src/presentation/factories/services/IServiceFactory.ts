import {
  CreateBoardService,
  CreateStoryService,
  ListBoardService,
  ShowBoardService,
  UpdateStoryService,
} from "../../services";

export interface IServiceFactory {
  makeListBoardService(): ListBoardService;
  makeCreateBoardService(): CreateBoardService;
  makeShowBoardService(): ShowBoardService;
  makeCreateStoryService(): CreateStoryService;
  makeUpdateStoryService(): UpdateStoryService;
}
