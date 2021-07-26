import AsyncStorage from "@react-native-async-storage/async-storage";
import { Story } from "../../entities";
import { UpdateStoryDTO } from "../../use-cases/dtos";
import { IUpdateStoryRepository } from "../../use-cases/interfaces";

class AsyncStorageUpdateStoryRepository implements IUpdateStoryRepository {
  async update({ title, content, storyId }: UpdateStoryDTO): Promise<void> {
    const stories: Story[] = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) || "[]"
    );

    const storyIndex = stories.findIndex((s) => s.id === storyId);
    const story = stories[storyIndex];
    story.title = title || story.title;
    story.content = content || story.content;

    await AsyncStorage.setItem("@Memo:stories", JSON.stringify(stories));
  }
}

export { AsyncStorageUpdateStoryRepository };
