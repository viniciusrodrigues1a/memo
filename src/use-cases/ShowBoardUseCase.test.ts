import { inMemoryHelperArray, InMemoryShowBoardRepository } from "./InMemory";
import { BoardNotFoundError } from "./errors";
import { ShowBoardUseCase } from "./ShowBoardUseCase";

function makeSut() {
  const showBoardRepository = new InMemoryShowBoardRepository();
  const sut = new ShowBoardUseCase(showBoardRepository);

  return { sut, showBoardRepository };
}

describe("Show a Board use-case", () => {
  beforeEach(() => {
    inMemoryHelperArray.push({
      id: "fce54dcf-795f-4253-b719-bfb131ee71d8",
      name: "My board",
      statuses: [],
    });

    inMemoryHelperArray.push({
      id: "ba571e73-2a9c-47e5-9371-56978c06db91",
      name: "My second board",
      statuses: [],
    });
  });

  afterEach(() => {
    inMemoryHelperArray.splice(0, inMemoryHelperArray.length);
  });

  it("should return a board", async () => {
    const { sut } = makeSut();

    const board = await sut.show("fce54dcf-795f-4253-b719-bfb131ee71d8");

    expect(board.name).toEqual("My board");
  });

  it("should throw error BoardNotFoundError", async () => {
    const { sut } = makeSut();

    await expect(
      sut.show("1f79fbbe-ee10-443c-81aa-c8b023ba0080")
    ).rejects.toThrow(
      new BoardNotFoundError("1f79fbbe-ee10-443c-81aa-c8b023ba0080")
    );
  });
});
