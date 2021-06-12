import { inMemoryHelperArray, InMemoryCreateStoryRepository } from "./InMemory";
import { InvalidStatusError } from "./errors";
import { CreateStoryUseCase } from "./CreateStoryUseCase";

function makeSut() {
  const inMemoryShowBoardRepository = { show: jest.fn() };
  const inMemoryCreateStoryRepository = new InMemoryCreateStoryRepository();
  const sut = new CreateStoryUseCase(
    inMemoryCreateStoryRepository,
    inMemoryShowBoardRepository
  );

  return { sut, inMemoryCreateStoryRepository, inMemoryShowBoardRepository };
}

describe("Story creation use-case", () => {
  afterEach(() => {
    inMemoryHelperArray.splice(0, inMemoryHelperArray.length);
  });

  it("should be able to create a Story", async () => {
    // given
    const { sut, inMemoryShowBoardRepository } = makeSut();

    const boardId = "9aa1db2d-fcb8-45e4-89c8-a6e168e5ec4a";
    const status = {
      name: "todo",
      boardId,
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };
    const board = {
      id: boardId,
      name: "My board",
      statuses: [status],
    };

    inMemoryShowBoardRepository.show.mockResolvedValue(board);

    inMemoryHelperArray.push(board);

    // when
    await sut.create({
      title: "Todo task",
      content: "Clean the living room",
      status,
    });

    // then
    const storyContent = inMemoryHelperArray.find((b) => b.name === "My board")
      ?.statuses[0].stories[0].content;
    expect(storyContent).toEqual("Clean the living room");
  });

  it("should NOT be able to create a Story if status is invalid", async () => {
    const { sut, inMemoryShowBoardRepository } = makeSut();
    inMemoryShowBoardRepository.show.mockResolvedValue(undefined);
    const boardId = "2a262c28-8ef3-4740-8a44-b75302378446";
    const status = {
      name: "todo",
      boardId,
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };

    await expect(
      sut.create({
        title: "Todo task",
        content: "Clean the living room",
        status,
      })
    ).rejects.toThrow(new InvalidStatusError("todo"));
  });

  it("should NOT remove older stories when adding a new one", async () => {
    // given
    const { sut, inMemoryShowBoardRepository } = makeSut();

    const boardId = "9aa1db2d-fcb8-45e4-89c8-a6e168e5ec4a";
    const status = {
      name: "todo",
      boardId,
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };
    const board = {
      id: boardId,
      name: "My board",
      statuses: [status],
    };

    inMemoryShowBoardRepository.show.mockResolvedValue(board);

    inMemoryHelperArray.push(board);

    // when
    await sut.create({
      title: "Todo task",
      content: "Clean the living room",
      status,
    });

    await sut.create({
      title: "Second task",
      content: "Do the dishes",
      status,
    });

    // then
    const storyContent = inMemoryHelperArray.find((b) => b.name === "My board")
      ?.statuses[0].stories[0].content;
    expect(storyContent).toEqual("Clean the living room");
  });
});
