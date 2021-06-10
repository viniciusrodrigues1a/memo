export class NoBoardFoundError extends Error {
  constructor() {
    const message = "No board was found";
    super(message);
    this.message = message;
  }
}
