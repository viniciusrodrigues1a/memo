import { Board } from "../../entities";
import { ShowBoardUseCase } from "../../use-cases";
import { NoBoardFoundError } from "../../use-cases/errors";
import { BaseResponse } from "./type-defs";

type ShowBoardServiceResponse = BaseResponse & {
  board?: Board;
};

export class ShowBoardService {
  constructor(private showBoardUseCase: ShowBoardUseCase) {}

  async handle(id: string): Promise<ShowBoardServiceResponse> {
    try {
      const board = await this.showBoardUseCase.show(id);

      return { error: false, errorMessage: null, board };
    } catch (err) {
      if (err instanceof NoBoardFoundError) {
        return { error: true, errorMessage: err.message };
      }

      return { error: true, errorMessage: "Story couldn't be loaded" };
    }
  }
}
