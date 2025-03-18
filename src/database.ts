import { knex as setupKnex, Knex } from 'knex';
import config from '../knexfile'; // Importe a configuração do knexfile.ts

// Crie a instância do Knex com a configuração importada
export const knex = setupKnex(config);