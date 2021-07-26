import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageShowStoryRepository } from "./AsyncStorageShowStoryRepository";

function makeSut() {
  const sut = new AsyncStorageShowStoryRepository();
  return { sut };
}

describe("Show a Story using AsyncStorage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:stories");
  });

  it("should return a Story", async () => {
    const { sut } = makeSut();

    const story = {
      title: "My story",
      content: "My story's content",
      statusId: "status-id-0",
      id: "story-id-0",
    };
    await AsyncStorage.setItem("@Memo:stories", JSON.stringify([story]));

    const storyFound = await sut.show(story.id);

    expect(storyFound!.content).toBe(story.content);
  });
});
