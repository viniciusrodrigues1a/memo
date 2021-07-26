import AsyncStorage from "@react-native-async-storage/async-storage";

import { v4 as uuid } from "uuid";
import { CreateStoryDTO } from "../../use-cases/dtos";
import { ICreateStoryRepository } from "../../use-cases/interfaces";

export class AsyncStorageCreateStoryRepository
  implements ICreateStoryRepository
{
  async create({ title, content, statusId }: CreateStoryDTO): Promise<void> {
    let stories = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) || "[]"
    );

    stories = stories.concat([{ title, content, statusId, id: uuid() }]);

    await AsyncStorage.setItem("@Memo:stories", JSON.stringify(stories));
  }
}
