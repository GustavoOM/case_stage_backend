import 'dotenv/config';

module.exports = {
  type: process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};