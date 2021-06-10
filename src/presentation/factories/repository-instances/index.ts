import {
  AsyncStorageCreateBoardRepository,
  AsyncStorageShowBoardRepository,
  AsyncStorageListBoardRepository,
} from "../../../infra/repositories";

export const asyncStorageListBoardRepository =
  new AsyncStorageListBoardRepository();

export const asyncStorageShowBoardRepository =
  new AsyncStorageShowBoardRepository(asyncStorageListBoardRepository);

export const asyncStorageCreateBoardRepository =
  new AsyncStorageCreateBoardRepository(asyncStorageListBoardRepository);
