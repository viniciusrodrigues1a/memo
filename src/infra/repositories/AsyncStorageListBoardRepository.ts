import AsyncStorage from "@react-native-async-storage/async-storage";
import { IListBoardRepository } from "../../use-cases/repositories";
import { Board } from "../../entities";

export class AsyncStorageListBoardRepository implements IListBoardRepository {
  async list(): Promise<Board[]> {
    const storedBoards = JSON.parse(
      (await AsyncStorage.getItem("@Memo:boards")) || "[]"
    );
    const storedStatuses = JSON.parse(
      (await AsyncStorage.getItem("@Memo:statuses")) || "[]"
    );
    const storedStories = JSON.parse(
      (await AsyncStorage.getItem("@Memo:stories")) || "[]"
    );

    if (!storedBoards) {
      return [];
    }

    const statuses = this.findReference(
      storedStatuses,
      storedStories,
      "statusId",
      "stories"
    );
    const boards = this.findReference(
      storedBoards,
      statuses,
      "boardId",
      "statuses"
    );

    return boards;
  }

  findReference(
    referencedArray: any,
    referenceArray: any,
    referenceKey: string,
    propertyOut: string
  ) {
    const result = referencedArray.map((referenced: any) => {
      const referenceArrayFiltered = referenceArray.filter(
        (reference: any) => reference[referenceKey] === referenced.id
      );

      return {
        ...referenced,
        [propertyOut]: referenceArrayFiltered,
      };
    });

    return result;
  }
}
