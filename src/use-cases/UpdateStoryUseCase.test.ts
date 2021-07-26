import { mock } from "jest-mock-extended";
import { Story } from "../entities";
import { NoStoryFoundError } from "./errors";
import { IShowStoryRepository, IUpdateStoryRepository } from "./interfaces";
import { UpdateStoryUseCase } from "./UpdateStoryUseCase";

function makeSut() {
  const updateStoryRepository = mock<IUpdateStoryRepository>();
  const showStoryRepository = mock<IShowStoryRepository>();
  const sut = new UpdateStoryUseCase(
    updateStoryRepository,
    showStoryRepository
  );

  return { sut, updateStoryRepository, showStoryRepository };
}

describe("Updating a story use-case", () => {
  it("should be able to update a Story", async () => {
    const { sut, showStoryRepository, updateStoryRepository } = makeSut();

    const updatedContent = "New updated content";
    showStoryRepository.show.mockResolvedValueOnce({
      title: "My story",
      content: "My story's content",
      storyId: "story-id-0",
    } as Story);

    await sut.update({
      storyId: "story-id-0",
      content: updatedContent,
    });

    expect(updateStoryRepository.update).toHaveBeenCalled();
  });

  it("should throw NoStoryFoundError", async () => {
    const { sut, showStoryRepository } = makeSut();

    showStoryRepository.show.mockResolvedValueOnce(undefined);

    await expect(
      sut.update({ storyId: "story-id-0", content: "New updated content" })
    ).rejects.toThrow(new NoStoryFoundError());
  });
});
