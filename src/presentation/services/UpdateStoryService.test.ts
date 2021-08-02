import { mock } from "jest-mock-extended";
import { UpdateStoryUseCase } from "../../use-cases";
import { UpdateStoryDTO } from "../../use-cases/dtos";
import { NoStoryFoundError } from "../../use-cases/errors";
import { UpdateStoryService } from "./UpdateStoryService";

function makeSut() {
  const updateStoryUseCaseMock = mock<UpdateStoryUseCase>();
  const sut = new UpdateStoryService(updateStoryUseCaseMock);

  return { sut, updateStoryUseCaseMock };
}

describe("Service for updating a Story", () => {
  it("should update a Story", async () => {
    const { sut } = makeSut();

    const response = await sut.handle({} as UpdateStoryDTO);

    expect(response.error).toBe(false);
  });

  it("should return an error if Story couldn't be updated", async () => {
    const { sut, updateStoryUseCaseMock } = makeSut();
    updateStoryUseCaseMock.update.mockImplementationOnce(() => {
      throw new NoStoryFoundError();
    });

    const response = await sut.handle({} as UpdateStoryDTO);

    expect(response.error).toBe(true);
  });
});
