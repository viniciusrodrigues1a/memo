import AsyncStorage from "@react-native-async-storage/async-storage";

import { Board } from "../../entities";
import { CreateStoryDTO } from "../../use-cases/dtos";
import { ICreateStoryRepository } from "../../use-cases/interfaces";

export class AsyncStorageCreateStoryRepository
  implements ICreateStoryRepository
{
  async create({
    title,
    content,
    boardId,
    statusId,
  }: CreateStoryDTO): Promise<void> {
    const boards: Board[] = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) as string
    );

    const storedStatus = boards
      .find((b) => b.id === boardId)
      ?.statuses.find((s) => s.id === statusId);

    if (!storedStatus) {
      throw new Error("storedStatus is undefined");
    }

    storedStatus.stories = storedStatus.stories.concat([{ title, content }]);

    await AsyncStorage.setItem("@Memo:boards", JSON.stringify(boards));
  }
}
