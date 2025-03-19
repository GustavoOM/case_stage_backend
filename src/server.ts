import { app } from "./app";

const port = process.env.PORT || 3333;

app.listen({
    port: Number(port),
    host: '0.0.0.0'
}).then(() => {
    console.log(`HTTP Server Running on port ${port}!`);
});