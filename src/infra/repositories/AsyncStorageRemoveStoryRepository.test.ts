import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageRemoveStoryRepository } from "./AsyncStorageRemoveStoryRepository";

function makeSut() {
  const sut = new AsyncStorageRemoveStoryRepository();

  return { sut };
}

describe("Remove Story repository using async-storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:stories");
  });

  it("should remove a Story from async-storage successfully", async () => {
    const { sut } = makeSut();
    const firstStory = {
      title: "My story",
      content: "My story's content",
      statusId: "status-id-0",
      id: "story-id-0",
    };
    const secondStory = { ...firstStory, id: "story-id-1" };
    await AsyncStorage.setItem(
      "@Memo:stories",
      JSON.stringify([firstStory, secondStory])
    );

    await sut.remove(firstStory.id);

    const stories = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) as string
    );
    expect(stories).toStrictEqual([secondStory]);
  });
});
