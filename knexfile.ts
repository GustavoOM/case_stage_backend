import 'dotenv/config';
import { Knex } from 'knex';

const production: Knex.Config = {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, 
    },
    migrations: {
      extension: 'ts',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  };

const development: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  }
};

function getConfig(): Knex.Config {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    return production;
  }
  return development;
}

export default getConfig();