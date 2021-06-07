export class BoardAlreadyExistsError extends Error {
  constructor(boardName: string) {
    const message = `Board ${boardName} already exists`;
    super(message);
    this.message = message;
  }
}
