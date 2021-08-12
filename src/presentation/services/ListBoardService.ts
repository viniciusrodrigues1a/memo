import { Board } from "../../entities";
import { ListBoardUseCase } from "../../use-cases";
import { NoBoardFoundError } from "../../use-cases/errors";
import { BaseResponse } from "./type-defs";

type Response = BaseResponse & {
  boards: Board[];
};

export class ListBoardService {
  constructor(private listBoardUseCase: ListBoardUseCase) {}

  async list(): Promise<Response> {
    try {
      const boards = await this.listBoardUseCase.list();

      return { error: false, errorMessage: null, boards };
    } catch (err) {
      if (err instanceof NoBoardFoundError) {
        return { error: false, errorMessage: null, boards: [] };
      }

      return {
        error: true,
        errorMessage: "Boards couldn't be loaded",
        boards: [],
      };
    }
  }
}
