import { ShowBoardUseCase } from "../../use-cases";
import { asyncStorageShowBoardRepository } from "./repository-instances";

export const showBoardUseCase = new ShowBoardUseCase(
  asyncStorageShowBoardRepository
);
