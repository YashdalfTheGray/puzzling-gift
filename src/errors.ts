export class NoPuzzlesFoundForUserError extends Error {
  constructor(private userId: string) {
    super();
  }

  public toString() {
    return `No puzzles found for user ${this.userId}`;
  }

  public getStackTrace() {
    return this.stack;
  }
}
