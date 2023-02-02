import { Options } from "@mikro-orm/core";

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgresql',
  password: 'docker',
  dbName: 'rep-tracker',
  entities: [],
};

export default config;