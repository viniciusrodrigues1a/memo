import { CreateStoryUseCase } from "../../use-cases";
import {
  asyncStorageCreateStoryRepository,
  asyncStorageShowBoardRepository,
} from "./repository-instances";

export const createStoryUseCase = new CreateStoryUseCase(
  asyncStorageCreateStoryRepository,
  asyncStorageShowBoardRepository
);
