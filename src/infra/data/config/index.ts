import dbConfig from "./db.config";
import { Sequelize } from "sequelize";

import { initializeTask } from "../models/Task";
import env from "../../../env";
import { IEnvironment } from "./IConfig";

const environment: IEnvironment =
  (env.NODE_ENV as IEnvironment) || "development";
const config = dbConfig[environment];

export const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  host: config.host,
  username: config.username,
  password: config.password,
  logging: config.logging,
  dialectOptions: config.dialectOptions,
});

const models = {
  Task: initializeTask(sequelize),
};

Object.values(models).forEach((model) => {
  if ((model as any).associate) {
    (model as any).associate();
  }
});

export async function makeDb(): Promise<Sequelize> {
  try {
    await sequelize.sync();
    console.log("Tables synced successfully.");
    return sequelize;
  } catch (error) {
    throw new Error(`Unable to sync tables: ${error}`);
  }
}

const db = async () => {
  const make = await makeDb();
  return make;
};

export { models };
export default db;
