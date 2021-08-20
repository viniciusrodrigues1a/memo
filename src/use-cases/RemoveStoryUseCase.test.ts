import { mock } from "jest-mock-extended";
import { NoStoryFoundError } from "./errors";
import { RemoveStoryUseCase } from "./RemoveStoryUseCase";
import { IRemoveStoryRepository, IShowStoryRepository } from "./repositories";

function makeSut() {
  const showStoryRepositoryMock = mock<IShowStoryRepository>();
  const removeStoryRepositoryMock = mock<IRemoveStoryRepository>();
  const sut = new RemoveStoryUseCase(
    showStoryRepositoryMock,
    removeStoryRepositoryMock
  );

  return { sut, showStoryRepositoryMock, removeStoryRepositoryMock };
}

describe("Remove Story use-case", () => {
  it("should remove a Story succesfully", async () => {
    const { sut, showStoryRepositoryMock, removeStoryRepositoryMock } =
      makeSut();
    const story = {
      id: "my-story-0",
      title: "My story",
      content: "My story's content",
    };
    showStoryRepositoryMock.show.mockResolvedValueOnce(story);

    await sut.remove(story.id);

    expect(removeStoryRepositoryMock.remove).toHaveBeenNthCalledWith(
      1,
      story.id
    );
  });

  it("should throw NoStoryFoundError", async () => {
    const { sut, showStoryRepositoryMock } = makeSut();
    showStoryRepositoryMock.show.mockResolvedValueOnce(undefined);

    await expect(sut.remove("my-story-0")).rejects.toThrow(
      new NoStoryFoundError()
    );
  });
});
