import { Task } from "../models/Task";

type Dialect =
  | "mysql"
  | "mariadb"
  | "postgres"
  | "sqlite"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";

interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
  dialectOptions?: {
    ssl: boolean;
    rejectUnauthorized: boolean;
  };
}

export interface IDbConfig {
  test: IConfig;
  development: IConfig;
  production: IConfig;
}

export interface IModels {
  Task: typeof Task;
}

export type IEnvironment = keyof IDbConfig;
