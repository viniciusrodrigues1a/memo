export class BoardAlreadyExistsError extends Error {
  constructor(boardName: string) {
    super(boardName);
    this.message = `Board ${boardName} already exists`;
  }
}
