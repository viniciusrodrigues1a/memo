export class BoardNameExceedsMaximumLength extends Error {
  constructor(length: number) {
    const message = `Board name exceeds maximum length of ${length}`;
    super(message);
    this.message = message;
  }
}
