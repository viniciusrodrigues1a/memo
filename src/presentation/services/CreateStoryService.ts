import { CreateStoryUseCase } from "../../use-cases";
import { CreateStoryDTO } from "../../use-cases/dtos";
import { BaseResponse } from "./type-defs";

export class CreateStoryService {
  constructor(private createStoryUseCase: CreateStoryUseCase) {}

  async handle({
    title,
    content,
    statusId,
  }: CreateStoryDTO): Promise<BaseResponse> {
    try {
      await this.createStoryUseCase.create({ title, content, statusId });

      return { error: false, errorMessage: null };
    } catch (err) {}

    return { error: true, errorMessage: "Unhandled error" }; // TODO
  }
}
