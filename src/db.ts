// we need this for typeORM reflection
import "reflect-metadata";

import fs from "fs";
import { DataSource, DataSourceOptions, EntityManager } from "typeorm";
import * as entities from "./entities";

export const DB_PATH = "db.sqlite";

const connectionOptions: DataSourceOptions = {
  type: "sqlite",
  database: DB_PATH,

  // in a real app, we glob the entities directory and import all files
  entities: Object.values(entities),

  // verbose logging for debugging
  // logging: true,
};

let _em: EntityManager;
// returns a connection or lazily creates one
export const database = async () => {
  if (_em) return _em;

  const needsDBInit = !fs.existsSync(DB_PATH);

  const con = new DataSource(connectionOptions);
  await con.initialize();
  _em = con.createEntityManager();

  await _em.transaction(async (em) => {
    await em.connection.synchronize();

    // seed the DB on first run
    if (needsDBInit) await seed(em);
  });

  return _em;
};

// populates the DB with test data
const seed = async (em: EntityManager) => {
  const mockUsers: [string, string, string[]][] = [
    ["foo@bar.com", "+81-0736-7841", ["skiing"]],
    ["matic@usagi.io", "+81-0716-7304", ["hiking", "coding"]],
  ];

  const users = mockUsers.map((u) => {
    const user = new entities.User();
    user.email = u[0];
    user.phone = u[1];
    user.hobbies = u[2];
    return user;
  });
  await em.save(users);
};

export * from "./entities";
