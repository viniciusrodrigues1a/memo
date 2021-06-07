import { Board } from "../entities/Board";

interface ICreateBoardRepository {
  create(name: string): void;
}

interface IShowBoardRepository {
  show(name: string): Board | undefined;
}

const inMemoryHelperArray: Board[] = [];

class InMemoryCreateBoardRepository implements ICreateBoardRepository {
  create(name: string): void {
    inMemoryHelperArray.push({ name, stories: [] });
  }
}

class InMemoryShowBoardRepository implements IShowBoardRepository {
  show(name: string): Board | undefined {
    return inMemoryHelperArray.find((b) => b.name === name);
  }
}

class BoardAlreadyExistsError extends Error {
  constructor(boardName: string) {
    super(boardName);
    this.message = `Board ${boardName} already exists`;
  }
}

class CreateBoardUseCase {
  constructor(
    private createBoardRepository: ICreateBoardRepository,
    private showBoardRepository: IShowBoardRepository
  ) {}

  create(name: string) {
    const boardAlreadyExists = this.showBoardRepository.show(name);
    if (boardAlreadyExists) {
      throw new BoardAlreadyExistsError(name);
    }

    this.createBoardRepository.create(name);
  }
}

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
