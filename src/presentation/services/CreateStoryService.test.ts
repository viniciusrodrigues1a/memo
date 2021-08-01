import { mock } from "jest-mock-extended";
import { CreateStoryUseCase } from "../../use-cases";
import { CreateStoryDTO } from "../../use-cases/dtos";
import { CreateStoryService } from "./CreateStoryService";

function makeSut() {
  const createStoryUseCaseMock = mock<CreateStoryUseCase>();
  const sut = new CreateStoryService(createStoryUseCaseMock);

  return { sut, createStoryUseCaseMock };
}

describe("Service for creating a Story", () => {
  it("should create a Story", async () => {
    const { sut } = makeSut();

    const response = await sut.handle({} as CreateStoryDTO);

    expect(response.error).toBe(false);
  });
});
