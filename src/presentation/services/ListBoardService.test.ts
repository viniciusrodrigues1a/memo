import { mock } from "jest-mock-extended";
import { Board } from "../../entities";
import { IListBoardUseCase } from "../../use-cases";
import { ListBoardService } from "./ListBoardService";

function makeSut() {
  const listBoardUseCaseMock = mock<IListBoardUseCase>();
  const sut = new ListBoardService(listBoardUseCaseMock);

  return { sut, listBoardUseCaseMock };
}

describe("Service for listing Boards", () => {
  it("should return Boards", async () => {
    const { sut, listBoardUseCaseMock } = makeSut();

    listBoardUseCaseMock.list.mockResolvedValueOnce([
      { name: "board-1" },
      { name: "board-2" },
    ] as Board[]);

    const response = await sut.list();

    expect(response.boards[0].name).toBe("board-1");
  });

  it("should return no error and an empty array", async () => {
    const { sut, listBoardUseCaseMock } = makeSut();

    listBoardUseCaseMock.list.mockResolvedValueOnce([]);

    const response = await sut.list();

    expect(response).toMatchObject({ error: false, boards: [] });
  });

  it("should return an error and empty array", async () => {
    const { sut, listBoardUseCaseMock } = makeSut();

    listBoardUseCaseMock.list.mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.list();

    expect(response).toMatchObject({ error: true, boards: [] });
  });
});
