import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

export const app = Fastify();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
});

app.register(routes);