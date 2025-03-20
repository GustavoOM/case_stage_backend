import { test, beforeAll, afterAll, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { knex } from "../src/database";

beforeAll(async () => {
    await app.ready();
});

afterAll(async () => {
    await app.close();
});

describe("Area Endpoints", () => {
    test("O usuário consegue criar uma área", async () => {
        await request(app.server)
            .post("/area")
            .send({
                name: "Área A"
            })
            .expect(201);
    });

    test("O usuário consegue listar todas as áreas", async () => {
        const response = await request(app.server)
            .get("/area")
            .expect(200);

        expect(response.body.areas).toBeInstanceOf(Array);
    });

    test("O usuário consegue buscar uma área por ID", async () => {
        const createResponse = await request(app.server)
            .post("/area")
            .send({
                name: "Área B"
            });

        const areaId = createResponse.body.id;

        const response = await request(app.server)
            .get(`/area/${areaId}`)
            .expect(200);

        expect(response.body.area).toEqual({
            id: areaId,
            name: "Área B",
            created_at: expect.any(String)
        });
    });

    test("O usuário recebe erro 404 ao buscar uma área com ID inexistente", async () => {
        await request(app.server)
            .get("/area/00000000-0000-0000-0000-000000000000")
            .expect(404);
    });

    test("O usuário consegue atualizar uma área", async () => {
        const createResponse = await request(app.server)
            .post("/area")
            .send({
                name: "Área C"
            });

        const areaId = createResponse.body.id;

        await request(app.server)
            .put(`/area/${areaId}`)
            .send({
                name: "Área C Atualizada"
            })
            .expect(204);

        const getResponse = await request(app.server)
            .get(`/area/${areaId}`)
            .expect(200);

        expect(getResponse.body.area.name).toBe("Área C Atualizada");
    });

    test("O usuário recebe erro 404 ao atualizar uma área com ID inexistente", async () => {
        await request(app.server)
            .put("/area/00000000-0000-0000-0000-000000000000")
            .send({
                name: "Área Inexistente"
            })
            .expect(404);
    });

    test("O usuário consegue deletar uma área", async () => {
        const createResponse = await request(app.server)
            .post("/area")
            .send({
                name: "Área D"
            });

        const areaId = createResponse.body.id;

        await request(app.server)
            .delete(`/area/${areaId}`)
            .expect(204);

        await request(app.server)
            .get(`/area/${areaId}`)
            .expect(404);
    });

    test("O usuário recebe erro 404 ao deletar uma área com ID inexistente", async () => {
        await request(app.server)
            .delete("/area/00000000-0000-0000-0000-000000000000")
            .expect(404);
    });
});

describe("Process Endpoints", () => {
    let areaId: string;

    beforeAll(async () => {
        const createAreaResponse = await request(app.server)
            .post("/area")
            .send({
                name: "Área para Processo"
            });

        areaId = createAreaResponse.body.id;
    });

    test("O usuário consegue criar um processo", async () => {
        await request(app.server)
            .post("/process")
            .send({
                name: "Processo A",
                tools: "Ferramentas A",
                responsibles: "Responsáveis A",
                documentations: "Documentações A",
                area_id: areaId
            })
            .expect(201);
    });

    test("O usuário consegue listar todos os processos", async () => {
        const response = await request(app.server)
            .get("/process")
            .expect(200);

        expect(response.body.processes).toBeInstanceOf(Array);
    });

    test("O usuário consegue buscar um processo por ID", async () => {
        const createResponse = await request(app.server)
            .post("/process")
            .send({
                name: "Processo B",
                tools: "Ferramentas B",
                responsibles: "Responsáveis B",
                documentations: "Documentações B",
                area_id: areaId
            });

        const processId = createResponse.body.id;

        const response = await request(app.server)
            .get(`/process/${processId}`)
            .expect(200);

        expect(response.body.process).toEqual({
            id: processId,
            name: "Processo B",
            tools: "Ferramentas B",
            responsibles: "Responsáveis B",
            documentations: "Documentações B",
            father_process: null,
            area_id: areaId,
            created_at: expect.any(String)
        });
    });

    test("O usuário recebe erro 404 ao buscar um processo com ID inexistente", async () => {
        await request(app.server)
            .get("/process/00000000-0000-0000-0000-000000000000")
            .expect(404);
    });

    test("O usuário consegue atualizar um processo", async () => {
        const createResponse = await request(app.server)
            .post("/process")
            .send({
                name: "Processo C",
                tools: "Ferramentas C",
                responsibles: "Responsáveis C",
                documentations: "Documentações C",
                area_id: areaId
            });

        const processId = createResponse.body.id;

        await request(app.server)
            .put(`/process/${processId}`)
            .send({
                name: "Processo C Atualizado"
            })
            .expect(204);

        const getResponse = await request(app.server)
            .get(`/process/${processId}`)
            .expect(200);

        expect(getResponse.body.process.name).toBe("Processo C Atualizado");
    });

    test("O usuário recebe erro 404 ao atualizar um processo com ID inexistente", async () => {
        await request(app.server)
            .put("/process/00000000-0000-0000-0000-000000000000")
            .send({
                name: "Processo Inexistente"
            })
            .expect(404);
    });

    test("O usuário consegue deletar um processo", async () => {
        const createResponse = await request(app.server)
            .post("/process")
            .send({
                name: "Processo D",
                tools: "Ferramentas D",
                responsibles: "Responsáveis D",
                documentations: "Documentações D",
                area_id: areaId
            });

        const processId = createResponse.body.id;

        await request(app.server)
            .delete(`/process/${processId}`)
            .expect(204);

        await request(app.server)
            .get(`/process/${processId}`)
            .expect(404);
    });

    test("O usuário recebe erro 404 ao deletar um processo com ID inexistente", async () => {
        await request(app.server)
            .delete("/process/00000000-0000-0000-0000-000000000000")
            .expect(404);
    });
});