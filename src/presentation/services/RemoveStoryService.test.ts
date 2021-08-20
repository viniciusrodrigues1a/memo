import { mock } from "jest-mock-extended";
import { RemoveStoryUseCase } from "../../use-cases";
import { NoStoryFoundError } from "../../use-cases/errors";
import { RemoveStoryService } from "./RemoveStoryService";

function makeSut() {
  const removeStoryUseCaseMock = mock<RemoveStoryUseCase>();
  const sut = new RemoveStoryService(removeStoryUseCaseMock);

  return { sut, removeStoryUseCaseMock };
}

describe("Remove Story service", () => {
  it("should return BaseResponse without error", async () => {
    const { sut } = makeSut();

    const response = await sut.handle("my-story-0");

    expect(response.error).toBe(false);
  });

  it("should return an error if no Story was found", async () => {
    const { sut, removeStoryUseCaseMock } = makeSut();
    removeStoryUseCaseMock.remove.mockImplementationOnce(() => {
      throw new NoStoryFoundError();
    });

    const response = await sut.handle("my-story-0");

    expect(response.errorMessage).toBe(new NoStoryFoundError().message);
  });

  it("should return a generic error message", async () => {
    const { sut, removeStoryUseCaseMock } = makeSut();
    removeStoryUseCaseMock.remove.mockImplementationOnce(() => {
      throw new Error("Server side error");
    });

    const response = await sut.handle("my-story-0");

    expect(response.errorMessage).toBe("Story couldn't be removed");
  });
});
