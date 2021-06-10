import { BoardNotFoundError } from "./errors";
import { ShowBoardUseCase } from "./ShowBoardUseCase";

function makeSut() {
  const listBoardRepository = { list: jest.fn() };
  const sut = new ShowBoardUseCase(listBoardRepository);

  return { sut, listBoardRepository };
}

describe("Show a Board use-case", () => {
  it("should return a board", async () => {
    const { sut, listBoardRepository } = makeSut();

    listBoardRepository.list.mockResolvedValue([
      {
        id: "fce54dcf-795f-4253-b719-bfb131ee71d8",
        name: "My board",
        statuses: [],
      },
      {
        id: "ba571e73-2a9c-47e5-9371-56978c06db91",
        name: "My second board",
        statuses: [],
      },
    ]);

    const board = await sut.show("My board");

    expect(board.id).toEqual("fce54dcf-795f-4253-b719-bfb131ee71d8");
  });

  it("should throw error BoardNotFoundError", async () => {
    const { sut, listBoardRepository } = makeSut();

    listBoardRepository.list.mockResolvedValue([
      {
        id: "ba571e73-2a9c-47e5-9371-56978c06db91",
        name: "My second board",
        statuses: [],
      },
    ]);

    await expect(sut.show("My board")).rejects.toThrow(
      new BoardNotFoundError("My board")
    );
  });
});
