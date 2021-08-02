import { UpdateStoryUseCase } from "../../use-cases";
import { UpdateStoryDTO } from "../../use-cases/dtos";
import { BaseResponse } from "./type-defs";

export class UpdateStoryService {
  constructor(private updateStoryUseCase: UpdateStoryUseCase) {}

  async handle({
    storyId,
    title,
    content,
  }: UpdateStoryDTO): Promise<BaseResponse> {
    try {
      await this.updateStoryUseCase.update({ storyId, title, content });

      return { error: false, errorMessage: null };
    } catch (err) {
      return { error: true, errorMessage: "Couldn't update story" }; // TODO
    }
  }
}
