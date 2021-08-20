import {
  ICreateBoardRepository,
  ICreateStoryRepository,
  IListBoardRepository,
  IRemoveStoryRepository,
  IShowBoardRepository,
  IShowStatusRepository,
  IShowStoryRepository,
  IUpdateStoryRepository,
} from "../../../use-cases/repositories";

export interface IRepositoryFactory {
  makeCreateBoardRepository(): ICreateBoardRepository;
  makeListBoardRepository(): IListBoardRepository;
  makeShowBoardRepository(): IShowBoardRepository;
  makeCreateStoryRepository(): ICreateStoryRepository;
  makeUpdateStoryRepository(): IUpdateStoryRepository;
  makeShowStoryRepository(): IShowStoryRepository;
  makeRemoveStoryRepository(): IRemoveStoryRepository;
  makeShowStatusRepository(): IShowStatusRepository;
}
