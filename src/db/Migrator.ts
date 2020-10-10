import { sync as glob } from 'glob';
import Sqlite from 'better-sqlite3';
import path from 'path';
import { Ctor, Default } from '../types';
import MigrationInterface from './MigrationInterface';
import InvalidMigrationError from '../errors/InvalidMigrationError';

export default class Migrator {
  public static readonly MIGRATIONS_DIR =  __dirname + '/../migrations/';

  public constructor(private db: Sqlite.Database) {
    const migrationTableExists = this.db
      .prepare( `SELECT count(*) FROM sqlite_master WHERE type='table' AND name='migrations';` )
      .pluck()
      .get() as number;

      if (migrationTableExists === 0) {
        this.db.exec(`
          CREATE TABLE migrations (
            version INTEGER PRIMARY KEY,
            description TEXT
          ) WITHOUT ROWID;
        `)
      }
  }

  public upgradeAll(): void
  {
    const currentVersion = this.getCurrentVersion();

    for (const filename of glob(Migrator.MIGRATIONS_DIR + 'Migration_*.js')) {
      let versionStr = path.basename(filename);
      versionStr = versionStr.slice(10, versionStr.indexOf('.'));
      const version = parseInt(versionStr);
      if (Number.isNaN(version)) {
        throw new InvalidMigrationError('Invalid migration version: ' + versionStr);
      }

      if (currentVersion < version) {
        const migrationFile = require(filename) as Default<Ctor<MigrationInterface>>;
        const migration = new migrationFile.default();
        migration.up(this.db);

        this.db.exec(`
          INSERT INTO migrations (version, description)
            VALUES (${version}, '${migration.getDescription()}');
        `);
      }
    }
  }

  public getCurrentVersion(): number
  {
    const version = this.db
      .prepare( `SELECT MAX(version) FROM migrations;` )
      .pluck()
      .get() as number;

    return version ?? 0;
  }
}
