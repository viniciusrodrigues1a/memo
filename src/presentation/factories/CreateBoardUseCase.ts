import { CreateBoardUseCase } from "../../use-cases";
import {
  asyncStorageCreateBoardRepository,
  asyncStorageShowBoardRepository,
} from "./repository-instances";

export const createBoardUseCase = new CreateBoardUseCase(
  asyncStorageCreateBoardRepository,
  asyncStorageShowBoardRepository
);
