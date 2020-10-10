export default class InvalidMigrationError extends Error {
  public constructor(message: string)
  {
    super(message);
    this.name = 'InvalidMigrationError';
  }
}
