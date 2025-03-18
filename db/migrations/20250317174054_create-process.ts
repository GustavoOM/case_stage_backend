import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("process", (table) => {
        table.uuid("id").primary(),
        table.text("name").notNullable(),
        table.text("tools"),
        table.text("responsibles"),
        table.text("documentations"),
        table.uuid("father_process"),
        table.uuid("area_id").references("id").inTable("area").onDelete("CASCADE").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("process")
}

