import fastify from "fastify";

interface WashingMachine {
    id: number;
    status: string;
    timeUse: number;
}

import fs from "fs";
import path from "path";

const washingMachines: WashingMachine[] = JSON.parse(
    fs.readFileSync(path.join("washingMachines.json")).toString()
);

function fibonacci(n: number): number[] {
    let secqueance = [0, 1];
    for (let i = 2; i < n; i++) {
        secqueance.push(secqueance[i - 1] + secqueance[i - 2]);
    }
    return secqueance;
}

const server = fastify();

server.get<{ Params: { n: string } }>("/api/v1/test/:n", async (request, reply) => {
    const n = parseInt(request.params.n);
    const secqueance = fibonacci(n);
    let total = 0;
    for (let i = 0; i < secqueance.length; i++) {
        total = total + secqueance[i];
    }
    return {
        "member-count": secqueance.length,
        "secqueance": secqueance,
        "total": total,
    };
});
server.get("/api/washing", async (request, reply) => {
    return { washingMachines };
});

server.get<{ Params: { id: string } }>("/api/washing/:id", async (request, reply) => {
    const id = parseInt(request.params.id);
    const washingMachine = washingMachines.find((wm) => wm.id === id);
    if (!washingMachine) {
        reply.status(404);
        return { error: "Washing machine not found" };
    }
    return washingMachine;
});

server.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
