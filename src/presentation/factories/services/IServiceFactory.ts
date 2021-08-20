import {
  CreateBoardService,
  CreateStoryService,
  ListBoardService,
  RemoveStoryService,
  ShowBoardService,
  UpdateStoryService,
} from "../../services";

export interface IServiceFactory {
  makeListBoardService(): ListBoardService;
  makeCreateBoardService(): CreateBoardService;
  makeShowBoardService(): ShowBoardService;
  makeCreateStoryService(): CreateStoryService;
  makeUpdateStoryService(): UpdateStoryService;
  makeRemoveStoryService(): RemoveStoryService;
}
