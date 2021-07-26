import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageShowStatusRepository } from "./AsyncStorageShowStatusRepository";

function makeSut() {
  const sut = new AsyncStorageShowStatusRepository();

  return { sut };
}

describe("Show a Status using AsyncStorage", () => {
  afterEach(async () => {
    await AsyncStorage.removeItem("@Memo:statuses");
  });

  it("should return a Status", async () => {
    const { sut } = makeSut();

    const status = {
      name: "todo",
      id: "status-id-1",
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };
    await AsyncStorage.setItem("@Memo:statuses", JSON.stringify([status]));

    const sutResult = await sut.show("status-id-1");

    expect(sutResult!.name).toBe("todo");
  });

  it("should return undefined", async () => {
    const { sut } = makeSut();

    const status = {
      name: "todo",
      id: "status-id-1",
      colorHex: "#FF3300" as "#FF3300",
      stories: [],
    };
    await AsyncStorage.setItem("@Memo:statuses", JSON.stringify([status]));

    const sutResult = await sut.show("status-id-1");

    expect(sutResult!.name).toBe("todo");
  });
});
