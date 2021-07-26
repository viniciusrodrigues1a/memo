import { CreateStoryUseCase } from "../../use-cases";
import {
  asyncStorageCreateStoryRepository,
  asyncStorageShowStatusRepository,
} from "./repository-instances";

export const createStoryUseCase = new CreateStoryUseCase(
  asyncStorageCreateStoryRepository,
  asyncStorageShowStatusRepository
);
