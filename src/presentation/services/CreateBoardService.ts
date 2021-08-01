import { CreateBoardUseCase } from "../../use-cases";
import { BaseResponse } from "./type-defs";

export class CreateBoardService {
  constructor(private createBoardUseCase: CreateBoardUseCase) {}

  async handle(name: string): Promise<BaseResponse> {
    try {
      await this.createBoardUseCase.create(name);

      return { error: false, errorMessage: null };
    } catch (err) {
      return { error: true, errorMessage: err.message };
    }
  }
}
