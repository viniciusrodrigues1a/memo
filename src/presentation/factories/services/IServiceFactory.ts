import { CreateBoardService, ListBoardService } from "../../services";

export interface IServiceFactory {
  makeListBoardService(): ListBoardService;
  makeCreateBoardService(): CreateBoardService;
}
