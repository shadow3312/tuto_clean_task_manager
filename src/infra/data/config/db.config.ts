import env from "../../../env";
import { IDbConfig } from "./IConfig";

const dbConfig: IDbConfig = {
  test: {
    username: "root",
    password: "",
    database: "task_manager_test",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  development: {
    username: "root",
    password: "",
    database: "task_manager",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false,
  },
};

export default dbConfig;
