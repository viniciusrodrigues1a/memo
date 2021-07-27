import AsyncStorage from "@react-native-async-storage/async-storage";
import { Story } from "../../entities";
import { IShowStoryRepository } from "../../use-cases/repositories";

class AsyncStorageShowStoryRepository implements IShowStoryRepository {
  async show(id: string): Promise<Story | undefined> {
    const stories: Story[] = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) || "[]"
    );

    const story = stories.find((s) => s.id === id);

    return story;
  }
}

export { AsyncStorageShowStoryRepository };
