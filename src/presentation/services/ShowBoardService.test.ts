import { mock } from "jest-mock-extended";
import { Board } from "../../entities";
import { ShowBoardUseCase } from "../../use-cases";
import { NoBoardFoundError } from "../../use-cases/errors";
import { ShowBoardService } from "./ShowBoardService";

function makeSut() {
  const showBoardUseCaseMock = mock<ShowBoardUseCase>();
  const sut = new ShowBoardService(showBoardUseCaseMock);
  return { sut, showBoardUseCaseMock };
}

describe("Service for showing a Board", () => {
  it("should return Board", async () => {
    const { sut, showBoardUseCaseMock } = makeSut();

    showBoardUseCaseMock.show.mockResolvedValueOnce({
      name: "my board",
    } as Board);

    const response = await sut.handle("board-id-0");

    expect(response.board!.name).toBe("my board");
  });

  it("should return an error if no Board was found", async () => {
    const { sut, showBoardUseCaseMock } = makeSut();

    showBoardUseCaseMock.show.mockImplementationOnce(() => {
      throw new NoBoardFoundError();
    });

    const response = await sut.handle("board-id-0");

    expect(response.errorMessage).toBe(new NoBoardFoundError().message);
  });

  it("should return a generic error message", async () => {
    const { sut, showBoardUseCaseMock } = makeSut();

    showBoardUseCaseMock.show.mockImplementationOnce(() => {
      throw new Error("Something went wrong");
    });

    const response = await sut.handle("board-id-0");

    expect(response.errorMessage).toBe("Story couldn't be loaded");
  });
});
