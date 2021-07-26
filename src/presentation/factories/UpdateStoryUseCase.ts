import { UpdateStoryUseCase } from "../../use-cases/UpdateStoryUseCase";
import {
  asyncStorageShowStoryRepository,
  asyncStorageUpdateStoryRepository,
} from "./repository-instances";

export const updateStoryUseCase = new UpdateStoryUseCase(
  asyncStorageUpdateStoryRepository,
  asyncStorageShowStoryRepository
);
