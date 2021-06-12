export class InvalidStatusError extends Error {
  constructor(statusName: string) {
    const message = `Status '${statusName}' boardId doesn't correspond to an actual board`;
    super(message);
    this.message = message;
  }
}
