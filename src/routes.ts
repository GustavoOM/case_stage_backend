import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { knex } from "./database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Rotas para Área
    fastify.post("/area", async (request, reply) => {
        try {
            const createAreaBodySchema = z.object({
                name: z.string()
            });
            const { name } = createAreaBodySchema.parse(request.body);
    
            const id = randomUUID();
    
            await knex("area").insert({
                id,
                name,
            });
    
            return reply.status(201).send({ id }); // Retorna o ID criado
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    fastify.get("/area", async () => {
        const areas = await knex("area").select();
        return { areas };
    });

    fastify.get("/area/:id", async (request, reply) => {
        try {
            const getAreasParamsSchema = z.object({
                id: z.string().uuid()
            });
            const { id } = getAreasParamsSchema.parse(request.params);
    
            const area = await knex("area").where("id", id).first();
            if (!area) {
                return reply.status(404).send({ error: "Area not found" });
            }
    
            return { area };
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    fastify.put("/area/:id", async (request, reply) => {
        const getAreasParamsSchema = z.object({
            id: z.string().uuid()
        });
        const { id } = getAreasParamsSchema.parse(request.params);

        const updateAreaBodySchema = z.object({
            name: z.string()
        });
        const { name } = updateAreaBodySchema.parse(request.body);

        const areaExists = await knex("area").where("id", id).first();
        if (!areaExists) {
            return reply.status(404).send({ error: "Area not found" });
        }

        await knex("area").where("id", id).update({ name });

        return reply.status(204).send();
    });

    fastify.delete("/area/:id", async (request, reply) => {
        const getAreasParamsSchema = z.object({
            id: z.string().uuid()
        });
        const { id } = getAreasParamsSchema.parse(request.params);

        const areaExists = await knex("area").where("id", id).first();
        if (!areaExists) {
            return reply.status(404).send({ error: "Area not found" });
        }

        await knex("area").where("id", id).delete();

        return reply.status(204).send();
    });


    
    // Rotas para Processo
    fastify.post("/process", async (request, reply) => {
        try {
            const createProcessBodySchema = z.object({
                name: z.string(),
                tools: z.string(),
                responsibles: z.string(),
                documentations: z.string(),
                father_process: z.string().uuid().optional(),
                area_id: z.string().uuid(),
            });
            const { name, tools, responsibles, documentations, father_process, area_id } = createProcessBodySchema.parse(request.body);
    
            const id = randomUUID();
    
            await knex("process").insert({
                id,
                name,
                tools,
                responsibles,
                documentations,
                father_process,
                area_id
            });
    
            return reply.status(201).send({ id });
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Internal server error" });
        }
    });

    fastify.get("/process", async () => {
        const processes = await knex("process").select();
        return { processes };
    });

    fastify.get("/process/:id", async (request, reply) => {
        const getProcessParamsSchema = z.object({
            id: z.string().uuid()
        });
        const { id } = getProcessParamsSchema.parse(request.params);

        const process = await knex("process").where("id", id).first();
        if (!process) {
            return reply.status(404).send({ error: "Process not found" });
        }

        return { process };
    });

    fastify.put("/process/:id", async (request, reply) => {
        const getProcessParamsSchema = z.object({
            id: z.string().uuid()
        });
        const { id } = getProcessParamsSchema.parse(request.params);

        const updateProcessBodySchema = z.object({
            name: z.string().optional(),
            tools: z.string().optional(),
            responsibles: z.string().optional(),
            documentations: z.string().optional(),
            father_process: z.string().uuid().optional(),
            area_id: z.string().uuid().optional(),
        });
        const updateData = updateProcessBodySchema.parse(request.body);

        const processExists = await knex("process").where("id", id).first();
        if (!processExists) {
            return reply.status(404).send({ error: "Process not found" });
        }

        const result = await knex("process").where("id", id).update(updateData);

        if (result === 0) {
            return reply.status(400).send({ error: "No changes made" });
        }

        return reply.status(204).send();
    });

    fastify.delete("/process/:id", async (request, reply) => {
        const getProcessParamsSchema = z.object({
            id: z.string().uuid()
        });
        const { id } = getProcessParamsSchema.parse(request.params);

        const processExists = await knex("process").where("id", id).first();
        if (!processExists) {
            return reply.status(404).send({ error: "Process not found" });
        }

        await knex("process").where("id", id).delete();

        return reply.status(204).send();
    });
}