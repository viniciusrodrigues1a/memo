import {
  AsyncStorageCreateBoardRepository,
  AsyncStorageShowBoardRepository,
  AsyncStorageListBoardRepository,
  AsyncStorageCreateStoryRepository,
} from "../../../infra/repositories";

export const asyncStorageListBoardRepository =
  new AsyncStorageListBoardRepository();

export const asyncStorageShowBoardRepository =
  new AsyncStorageShowBoardRepository(asyncStorageListBoardRepository);

export const asyncStorageCreateBoardRepository =
  new AsyncStorageCreateBoardRepository(asyncStorageListBoardRepository);

export const asyncStorageCreateStoryRepository =
  new AsyncStorageCreateStoryRepository();
