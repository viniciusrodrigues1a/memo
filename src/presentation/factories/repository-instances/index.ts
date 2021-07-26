import {
  AsyncStorageCreateBoardRepository,
  AsyncStorageShowBoardRepository,
  AsyncStorageListBoardRepository,
  AsyncStorageCreateStoryRepository,
  AsyncStorageShowStatusRepository,
  AsyncStorageShowStoryRepository,
  AsyncStorageUpdateStoryRepository,
} from "../../../infra/repositories";

export const asyncStorageListBoardRepository =
  new AsyncStorageListBoardRepository();

export const asyncStorageShowBoardRepository =
  new AsyncStorageShowBoardRepository(asyncStorageListBoardRepository);

export const asyncStorageCreateBoardRepository =
  new AsyncStorageCreateBoardRepository();

export const asyncStorageCreateStoryRepository =
  new AsyncStorageCreateStoryRepository();

export const asyncStorageShowStatusRepository =
  new AsyncStorageShowStatusRepository();

export const asyncStorageShowStoryRepository =
  new AsyncStorageShowStoryRepository();

export const asyncStorageUpdateStoryRepository =
  new AsyncStorageUpdateStoryRepository();
