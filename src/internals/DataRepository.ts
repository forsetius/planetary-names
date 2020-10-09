import fs from 'fs';
import Sqlite from 'better-sqlite3';

export default class DataRepository {
  private readonly db: Sqlite.Database;

  constructor(dbFile: string)
  {
    dbFile = __dirname + '/../../data/' + dbFile + '.sqlite';
    console.log(dbFile);
    if (!fs.existsSync(dbFile)) {

    }

    this.db = new Sqlite(dbFile);
  }

  public close(): void
  {
    this.db.close();
  }

}
