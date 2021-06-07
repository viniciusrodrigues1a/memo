import { Board } from "../entities/Board";

interface ICreateBoardRepository {
  create(name: string): void;
}

class InMemoryCreateBoardRepository implements ICreateBoardRepository {
  boards: Board[] = [];

  create(name: string): void {
    this.boards.push({ name, stories: [] });
  }
}

class CreateBoardUseCase {
  constructor(private createBoardRepository: ICreateBoardRepository) {}

  create(name: string) {
    this.createBoardRepository.create(name);
  }
}

describe("Board creation use-case", () => {
  it("should be able to create a new Board", () => {
    const inMemoryCreateBoardRepository = new InMemoryCreateBoardRepository();
    const createBoardUseCase = new CreateBoardUseCase(
      inMemoryCreateBoardRepository
    );

    createBoardUseCase.create("My new board");

    const board = inMemoryCreateBoardRepository.boards.find(
      (b) => b.name === "My new board"
    );
    expect(board?.name).toEqual("My new board");
  });
});
