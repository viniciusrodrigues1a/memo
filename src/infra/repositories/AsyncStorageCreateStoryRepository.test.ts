import AsyncStorage from "@react-native-async-storage/async-storage";
import { Story } from "../../entities";
import { AsyncStorageCreateStoryRepository } from "./AsyncStorageCreateStoryRepository";

describe("Story creation repository using Async Storage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:boards");
    await AsyncStorage.removeItem("@Memo:statuses");
    await AsyncStorage.removeItem("@Memo:stories");
  });

  it("should be able to create a story", async () => {
    // given
    const sut = new AsyncStorageCreateStoryRepository();

    const boardId = "6b3ca6a7-2073-424b-8c0c-e1eed1c30b67";
    const status = {
      name: "todo",
      boardId,
      id: "status-id-0",
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };

    await AsyncStorage.setItem(
      "@Memo:boards",
      JSON.stringify([
        {
          id: boardId,
          name: "My board",
        },
      ])
    );
    await AsyncStorage.setItem("@Memo:statuses", JSON.stringify([status]));

    // when
    await sut.create({
      title: "Studying",
      content: "Finish math homework",
      statusId: status.id,
    });

    // then
    const stories = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) as string
    );

    expect(stories[0].content).toEqual("Finish math homework");
  });

  it("should persist previous values", async () => {
    // given
    const sut = new AsyncStorageCreateStoryRepository();

    const boardId = "6b3ca6a7-2073-424b-8c0c-e1eed1c30b67";
    const status = {
      name: "todo",
      id: "status-id-1",
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };

    await AsyncStorage.setItem(
      "@Memo:boards",
      JSON.stringify([
        {
          id: boardId,
          name: "My board",
        },
      ])
    );
    await AsyncStorage.setItem("@Memo:statuses", JSON.stringify([status]));

    // when
    await sut.create({
      title: "Studying",
      content: "Finish math homework",
      statusId: status.id,
    });

    await sut.create({
      title: "Exercising",
      content: "Do 20 push ups",
      statusId: status.id,
    });

    // then
    const stories: Story[] = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) as string
    );

    const story = stories.find((s) => s.content === "Finish math homework");
    expect(story).toHaveProperty("content");
  });
});
