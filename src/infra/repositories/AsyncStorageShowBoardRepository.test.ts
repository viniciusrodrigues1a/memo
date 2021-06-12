import { AsyncStorageShowBoardRepository } from "./AsyncStorageShowBoardRepository";

function makeSut() {
  const listBoardRepository = { list: jest.fn() };
  const sut = new AsyncStorageShowBoardRepository(listBoardRepository);

  return { sut, listBoardRepository };
}

describe("Show a Board using AsyncStorage", () => {
  it("should return a Board", async () => {
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

    const board = await sut.show("fce54dcf-795f-4253-b719-bfb131ee71d8");

    expect(board?.name).toBe("My board");
  });
});
