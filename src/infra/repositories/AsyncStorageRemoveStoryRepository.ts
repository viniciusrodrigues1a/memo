import AsyncStorage from "@react-native-async-storage/async-storage";
import { Story } from "../../entities";
import { IRemoveStoryRepository } from "../../use-cases/repositories";

export class AsyncStorageRemoveStoryRepository
  implements IRemoveStoryRepository
{
  async remove(id: string): Promise<void> {
    const stories: Story[] = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) || "[]"
    );

    const filteredStories = stories.filter((s) => s.id !== id);

    await AsyncStorage.setItem(
      "@Memo:stories",
      JSON.stringify(filteredStories)
    );
  }
}
