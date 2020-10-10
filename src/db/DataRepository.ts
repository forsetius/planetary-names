import Sqlite from 'better-sqlite3';
import Migrator from './Migrator';

export default class DataRepository {
  private readonly db: Sqlite.Database;

  constructor(dbFile: string)
  {
    dbFile = __dirname + '/../../data/' + dbFile + '.sqlite';
    console.log(dbFile);

    this.db = new Sqlite(dbFile);
    new Migrator(this.db).upgradeAll();
  }

  public close(): void
  {
    this.db.close();
  }

}
