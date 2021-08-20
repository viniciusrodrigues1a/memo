import { RemoveStoryUseCase } from "../../use-cases";
import { NoStoryFoundError } from "../../use-cases/errors";
import { BaseResponse } from "./type-defs";

export class RemoveStoryService {
  public constructor(private removeStoryUseCase: RemoveStoryUseCase) {}

  async handle(id: string): Promise<BaseResponse> {
    try {
      await this.removeStoryUseCase.remove(id);

      return { error: false, errorMessage: null };
    } catch (err) {
      if (err instanceof NoStoryFoundError) {
        return { error: true, errorMessage: err.message };
      }

      return {
        error: true,
        errorMessage: "Story couldn't be removed",
      } as BaseResponse;
    }
  }
}
