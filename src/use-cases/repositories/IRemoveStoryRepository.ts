export interface IRemoveStoryRepository {
  remove(id: string): Promise<void>;
}
