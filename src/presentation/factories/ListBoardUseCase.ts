import { ListBoardUseCase } from "../../use-cases";
import { asyncStorageListBoardRepository } from "./repository-instances";

export const listBoardUseCase = new ListBoardUseCase(
  asyncStorageListBoardRepository
);
