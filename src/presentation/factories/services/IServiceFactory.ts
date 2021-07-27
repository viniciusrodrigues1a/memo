import { ListBoardService } from "../../services";

export interface IServiceFactory {
  makeListBoardService(): ListBoardService;
}
