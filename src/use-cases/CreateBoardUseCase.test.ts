import { CreateBoardUseCase } from "./CreateBoardUseCase";
import {
  InMemoryCreateBoardRepository,
  InMemoryShowBoardRepository,
  inMemoryHelperArray,
} from "./InMemoryMock";
import { BoardAlreadyExistsError } from "./errors";

describe("Board creation use-case", () => {
  afterEach(() => {
    inMemoryHelperArray.splice(0, inMemoryHelperArray.length);
  });

  it("should be able to create a new Board", () => {
    const inMemoryCreateBoardRepository = new InMemoryCreateBoardRepository();
    const inMemoryShowBoardRepository = new InMemoryShowBoardRepository();
    const createBoardUseCase = new CreateBoardUseCase(
      inMemoryCreateBoardRepository,
      inMemoryShowBoardRepository
    );

    createBoardUseCase.create("My new board");

    const board = inMemoryShowBoardRepository.show("My new board");
    expect(board?.name).toEqual("My new board");
  });

  it("should not be able to create a new Board because there is a Board with that name already", () => {
    const inMemoryCreateBoardRepository = new InMemoryCreateBoardRepository();
    const inMemoryShowBoardRepository = new InMemoryShowBoardRepository();
    const createBoardUseCase = new CreateBoardUseCase(
      inMemoryCreateBoardRepository,
      inMemoryShowBoardRepository
    );

    createBoardUseCase.create("My new board");

    expect(() => createBoardUseCase.create("My new board")).toThrow(
      new BoardAlreadyExistsError("My new board")
    );
  });
});
