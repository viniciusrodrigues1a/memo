import AsyncStorage from "@react-native-async-storage/async-storage";
import { IListBoardRepository } from "../../use-cases/interfaces";
import { Board } from "../../entities";

export class AsyncStorageListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    const storedBoards = await AsyncStorage.getItem("@Memo:boards");

    if (!storedBoards) {
      return [];
    }

    const boards = JSON.parse(storedBoards);

    return boards;
  }
}
