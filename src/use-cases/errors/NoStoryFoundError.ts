export class NoStoryFoundError extends Error {
  constructor() {
    const message = "No story was found";
    super(message);
    this.message = message;
  }
}
