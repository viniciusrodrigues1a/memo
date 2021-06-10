export class BoardNotFoundError extends Error {
  constructor(boardName: string) {
    const message = `Board '${boardName}' was not found`;
    super(message);
    this.message = message;
  }
}
