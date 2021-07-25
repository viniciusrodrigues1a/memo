import { Board } from "../entities";
import { CreateBoardUseCase } from "./CreateBoardUseCase";
import {
  InMemoryCreateBoardRepository,
  InMemoryShowBoardRepository,
  inMemoryHelperArray,
} from "./InMemory";
import {
  BoardAlreadyExistsError,
  BoardNameExceedsMaximumLength,
} from "./errors";

function makeSut() {
  const inMemoryCreateBoardRepository = new InMemoryCreateBoardRepository();
  const inMemoryShowBoardRepository = new InMemoryShowBoardRepository();
  const sut = new CreateBoardUseCase(
    inMemoryCreateBoardRepository,
    inMemoryShowBoardRepository
  );

  return { inMemoryShowBoardRepository, inMemoryCreateBoardRepository, sut };
}

describe("Board creation use-case", () => {
  afterEach(() => {
    inMemoryHelperArray.splice(0, inMemoryHelperArray.length);
  });

  it("should be able to create a new Board", async () => {
    const { sut } = makeSut();

    await sut.create("My new board");

    const board = inMemoryHelperArray.find((b) => b.name === "My new board");
    expect(board?.name).toEqual("My new board");
  });

  it("should not be able to create a new Board because there is a Board with that name already", async () => {
    const { sut, inMemoryShowBoardRepository } = makeSut();

    inMemoryShowBoardRepository.show = jest.fn(
      async (): Promise<Board | undefined> => ({
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: "My new board",
        statuses: [
          {
            name: "todo",
            id: "status-id-1",
            colorHex: "#FF3300",
            stories: [],
          },
        ],
      })
    );

    await expect(sut.create("My new board")).rejects.toThrow(
      new BoardAlreadyExistsError("My new board")
    );
  });

  it("should not be able to create a new Board if its name is longer than 32 characters", async () => {
    const { sut, inMemoryShowBoardRepository } = makeSut();

    inMemoryShowBoardRepository.show = jest.fn(
      async (): Promise<Board | undefined> => undefined
    );

    await expect(
      sut.create("My new board with a very long name")
    ).rejects.toThrow(new BoardNameExceedsMaximumLength(32));
  });
});
