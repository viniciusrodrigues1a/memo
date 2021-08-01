import {
  CreateBoardService,
  CreateStoryService,
  ListBoardService,
  ShowBoardService,
} from "../../services";

export interface IServiceFactory {
  makeListBoardService(): ListBoardService;
  makeCreateBoardService(): CreateBoardService;
  makeShowBoardService(): ShowBoardService;
  makeCreateStoryService(): CreateStoryService;
}
