import AsyncStorage from "@react-native-async-storage/async-storage";
import { Story } from "../../entities";
import { AsyncStorageUpdateStoryRepository } from "./AsyncStorageUpdateStoryRepository";

function makeSut() {
  const sut = new AsyncStorageUpdateStoryRepository();

  return { sut };
}

describe("Update a Story using AsyncStorage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:stories");
  });

  it("should update a Story", async () => {
    const { sut } = makeSut();
    const story = {
      title: "My story",
      content: "My story's content",
      id: "story-id-0",
    };
    await AsyncStorage.setItem("@Memo:stories", JSON.stringify([story]));

    await sut.update({ storyId: story.id, content: "Updated content" });

    const updatedStory = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) || "[]"
    ).find((s: Story) => s.id === story.id);
    expect(updatedStory.content).toBe("Updated content");
  });
});
