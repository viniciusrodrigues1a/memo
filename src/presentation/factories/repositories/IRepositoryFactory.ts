import {
  ICreateBoardRepository,
  ICreateStoryRepository,
  IListBoardRepository,
  IShowBoardRepository,
  IShowStatusRepository,
  IShowStoryRepository,
  IUpdateStoryRepository,
} from "../../../use-cases/interfaces";

export interface IRepositoryFactory {
  makeCreateBoardRepository(): ICreateBoardRepository;
  makeListBoardRepository(): IListBoardRepository;
  makeShowBoardRepository(): IShowBoardRepository;
  makeCreateStoryRepository(): ICreateStoryRepository;
  makeUpdateStoryRepository(): IUpdateStoryRepository;
  makeShowStoryRepository(): IShowStoryRepository;
  makeShowStatusRepository(): IShowStatusRepository;
}
