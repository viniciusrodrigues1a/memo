import {
  CreateBoardService,
  ListBoardService,
  ShowBoardService,
} from "../../services";

export interface IServiceFactory {
  makeListBoardService(): ListBoardService;
  makeCreateBoardService(): CreateBoardService;
  makeShowBoardService(): ShowBoardService;
}
