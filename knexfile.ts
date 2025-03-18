import 'dotenv/config';
import { Knex } from 'knex';

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
  pool: {
    afterCreate: (conn: any, done: (err?: Error | null) => void) => {
      conn.run('PRAGMA foreign_keys = ON;', done);
    },
  },
};

const production: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

// Função para garantir que a configuração nunca seja undefined
function getConfig(): Knex.Config {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    return production;
  }
  return development;
}

// Exporte a configuração correta
export default getConfig();