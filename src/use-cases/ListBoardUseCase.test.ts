import { inMemoryHelperArray, InMemoryListBoardRepository } from "./InMemory";
import { NoBoardFoundError } from "./errors";
import { ListBoardUseCase } from "./ListBoardUseCase";

function makeSut() {
  const inMemoryListBoardRepository = new InMemoryListBoardRepository();
  const sut = new ListBoardUseCase(inMemoryListBoardRepository);

  return { sut };
}

describe("List all boards use-case", () => {
  beforeEach(() => {
    const boards = [
      { id: "a8c35f01-a3d7-4b5c-9a50-9f7502ea2cc0", name: "My board" },
      { id: "8ee9bb6d-3ace-48db-9833-295f96297c73", name: "Second board" },
    ];

    boards.forEach(({ id, name }) => {
      inMemoryHelperArray.push({
        id,
        name,
        statuses: [
          {
            id: "status-id",
            name: "todo",
            colorHex: "#FF3300",
            stories: [],
          },
        ],
      });
    });
  });

  afterEach(() => {
    inMemoryHelperArray.splice(0, inMemoryHelperArray.length);
  });

  it("should be able to list created Boards", async () => {
    const { sut } = makeSut();

    const boards = await sut.list();

    const boardsNames = boards.map((b) => b.name);
    expect(boardsNames).toContain("My board");
  });

  it("should NOT be able to list a Board that was never created", async () => {
    const { sut } = makeSut();

    const boards = await sut.list();

    const boardsNames = boards.map((b) => b.name);
    expect(boardsNames.some((n) => n === "8ay38a")).toBe(false);
  });

  it("should throw NoBoardFound if no Board exists", async () => {
    inMemoryHelperArray.splice(0, inMemoryHelperArray.length);

    const { sut } = makeSut();

    await expect(sut.list()).rejects.toThrow(new NoBoardFoundError());
  });
});
