import Sqlite from 'better-sqlite3';
import MigrationInterface from './MigrationInterface';

export default class Migration_0 implements MigrationInterface {
  public getVersion(): number
  {
    return 0;
  }

  public getDescrition(): string
  {
    return 'Database initialization';
  }

  public up(db: Sqlite.Database): void {
    const sql = `
    CREATE TABLE targets (
      id INTEGER PRIMARY KEY,
      name TEXT
    );

    CREATE TABLE feature_types (
      code TEXT PRIMARY KEY,
      name TEXT
    );

    CREATE TABLE WITHOUT ROWID features (
      id INTEGER PRIMARY KEY,
      name TEXT,
      clean_name TEXT,
      target INTEGER,
      diameter INTEGER,
      center_lon REAL,
      center_lat REAL,
      north_lat REAL,
      east_lon REAL,
      south_lat REAL,
      west_lon REAL,
      continent TEXT,
      ethnicity TEXT,
      feature_type TEXT,
      approval_date TEXT,
      reference TEXT,
      origin TEXT,
      additional_info TEXT,
      last_updated TEXT,
      adjust_lon REAL DEFAULT 0,
      adjust_lat REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),

      FOREIGN KEY (target) REFERENCES targets (rowid),
      FOREIGN KEY (feature_type) REFERENCES feature_types (code)
    );

    CREATE TABLE logs (
      id INTEGER PRIMARY KEY,
      at TEXT DEFAULT NOW(),
      feature_id INTEGER,
      changed_from TEXT,
      changed_to TEXT,

      FOREIGN KEY (feature_id) REFERENCES features (id)
    );

    CREATE TABLE WITHOUT ROWID migrations (
      id INTEGER PRIMARY KEY,
      version TEXT
    );

    CREATE INDEX target_idx ON features(target);
    CREATE INDEX feature_type_idx ON features(feature_type);
    CREATE INDEX feature_idx ON logs(feature_id);

    INSERT INTO targets (name) VALUES
      ('Amalthea'),
      ('Ariel'),
      ('Callisto'),
      ('Charon'),
      ('Deimos'),
      ('Dione'),
      ('Enceladus'),
      ('Epimetheus'),
      ('Europa'),
      ('Ganymede'),
      ('Hyperion'),
      ('Iapetus'),
      ('Io'),
      ('Janus'),
      ('Mars'),
      ('Mercury'),
      ('Mimas'),
      ('Miranda'),
      ('Moon'),
      ('Oberon'),
      ('Phobos'),
      ('Phoebe'),
      ('Pluto'),
      ('Proteus'),
      ('Puck'),
      ('Rhea'),
      ('Tethys'),
      ('Thebe'),
      ('Titan'),
      ('Titania'),
      ('Triton'),
      ('Umbriel'),
      ('Venus');

    INSERT INTO feature_types (code, name) VALUES
      ('AL', 'Albedo Feature'),
      ('AR', 'Arcus, arcūs'),
      ('AS', 'Astrum, astra'),
      ('CA', 'Catena, catenae'),
      ('CB', 'Cavus, cavi'),
      ('CH', 'Chaos, chaoses'),
      ('CM', 'Chasma, chasmata'),
      ('CO', 'Collis, colles'),
      ('CR', 'Corona, coronae'),
      ('AA', 'Crater, craters'),
      ('DO', 'Dorsum, dorsa'),
      ('ER', 'Eruptive center'),
      ('FA', 'Facula, faculae'),
      ('FR', 'Farrum, farra'),
      ('FE', 'Flexus, flexūs'),
      ('FL', 'Fluctus, fluctūs'),
      ('FM', 'Flumen, flumina'),
      ('FO', 'Fossa, fossae'),
      ('FT', 'Fretum, freta'),
      ('IN', 'Insula, insulae'),
      ('LA', 'Labes, labēs'),
      ('LB', 'Labyrinthus, labyrinthi'),
      ('LU', 'Lacuna, lacunae'),
      ('LC', 'Lacus, lacūs'),
      ('LF', 'Landing site name'),
      ('LG', 'Large ringed feature'),
      ('LI', 'Linea, lineae'),
      ('LN', 'Lingula, lingulae'),
      ('MA', 'Macula, maculae'),
      ('ME', 'Mare, maria'),
      ('MN', 'Mensa, mensae'),
      ('MO', 'Mons, montes'),
      ('OC', 'Oceanus, oceani'),
      ('PA', 'Palus, paludes'),
      ('PE', 'Patera, paterae'),
      ('PL', 'Planitia, planitiae'),
      ('PM', 'Planum, plana'),
      ('PU', 'Plume, plumes'),
      ('PR', 'Promontorium, promontoria'),
      ('RE', 'Regio, regiones'),
      ('RT', 'Reticulum, reticula'),
      ('RI', 'Rima, rimae'),
      ('RU', 'Rupes, rupēs'),
      ('SF', 'Satellite Feature'),
      ('SA', 'Saxum, saxa'),
      ('SC', 'Scopulus, scopuli'),
      ('SI', 'Sinus, sinūs'),
      ('SE', 'Serpens, serpentes'),
      ('TA', 'Terra, terrae'),
      ('SU', 'Sulcus, sulci'),
      ('TH', 'Tholus, tholi'),
      ('TE', 'Tessera, tesserae'),
      ('VA', 'Vallis, valles'),
      ('UN', 'Unda, undae'),
      ('VI', 'Virga, virgae'),
      ('VS', 'Vastitas, vastitates');
  `;

    db.exec(sql);
  }

  public down(db: Sqlite.Database): void {
    const sql = `
      DROP TABLE logs IF EXISTS;
      DROP TABLE features IF EXISTS;
      DROP TABLE feature_types IF EXISTS;
      DROP TABLE targets IF EXISTS;
      DROP TABLE migrations IF EXISTS;
    `;

    db.exec(sql);
  }
}
