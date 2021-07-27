import AsyncStorage from "@react-native-async-storage/async-storage";
import { Status } from "../../entities";
import { IShowStatusRepository } from "../../use-cases/repositories";

class AsyncStorageShowStatusRepository implements IShowStatusRepository {
  async show(id: string): Promise<Status | undefined> {
    const statuses: Status[] = JSON.parse(
      (await AsyncStorage.getItem("@Memo:statuses")) || "[]"
    );

    const status = statuses.find((s) => s.id === id);

    return status;
  }
}

export { AsyncStorageShowStatusRepository };
