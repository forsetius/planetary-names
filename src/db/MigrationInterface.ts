import Sqlite from 'better-sqlite3';

export default interface MigrationInterface {
  getDescription(): string;
  up(db: Sqlite.Database): void;
  down(db: Sqlite.Database): void;
}
