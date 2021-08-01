import { mock } from "jest-mock-extended";
import { CreateBoardUseCase } from "../../use-cases";
import { BoardAlreadyExistsError } from "../../use-cases/errors";
import { CreateBoardService } from "./CreateBoardService";

function makeSut() {
  const createBoardUseCaseMock = mock<CreateBoardUseCase>();
  const sut = new CreateBoardService(createBoardUseCaseMock);

  return { sut, createBoardUseCaseMock };
}

describe("Service for creating a Board", () => {
  it("should create a Board", async () => {
    const { sut } = makeSut();

    const response = await sut.handle("My board");

    expect(response.error).toBe(false);
  });

  it("should return an error if Board already exists", async () => {
    const { sut, createBoardUseCaseMock } = makeSut();

    createBoardUseCaseMock.create.mockImplementationOnce(() => {
      throw new BoardAlreadyExistsError("My board");
    });

    const response = await sut.handle("My board");

    expect(response.error).toBe(true);
  });

  it("should return an error if a generic Error is thrown by the Service", async () => {
    const { sut, createBoardUseCaseMock } = makeSut();

    createBoardUseCaseMock.create.mockImplementationOnce(() => {
      throw new Error("Something went wrong");
    });

    const response = await sut.handle("My board");

    expect(response.error).toBe(true);
  });
});
