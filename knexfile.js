"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const development = {
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
        afterCreate: (conn, done) => {
            conn.run('PRAGMA foreign_keys = ON;', done);
        },
    },
};
const production = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
};
// Função para garantir que a configuração nunca seja undefined
function getConfig() {
    const env = process.env.NODE_ENV || 'development';
    if (env === 'production') {
        return production;
    }
    return development;
}
// Exporte a configuração correta
exports.default = getConfig();
