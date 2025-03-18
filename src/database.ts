import { knex as setupKnex, Knex } from "knex";
import { Database } from "sqlite3";

export const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: "./db/app.db", 
    },
    useNullAsDefault: true, 
    migrations: {
        extension: "ts",
        directory: "./db/migrations", 
    },
    pool: {
        afterCreate: (conn: Database, done: (err?: Error | null) => void) => {
            conn.run("PRAGMA foreign_keys = ON;", (err) => {
                if (err) {
                } else {
                    done();
                }
            });
        },
    },
};

export const knex = setupKnex(config);