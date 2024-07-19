import fastify from "fastify";
import { addMachine, deleteMachine, getAllMachines, getMachine, insertCoin, updateStatus, updateTimeLeft } from './db';

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
    if (isNaN(n)) {
        reply.status(400);
        return { error: "Invalid input  " };
    }
    if (n === 0 || n > 100) {
        reply.status(400);
        return { error: "Invalid input  " };
    }
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
    try {
        const washingMachines = await getAllMachines();
        return { washingMachines };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});

server.get<{ Params: { id: string } }>("/api/washing/:id", async (request, reply) => {
    const id = parseInt(request.params.id);
    try {
        const machine = await getMachine(id);
        if (!machine) {
            reply.status(404);
            return { error: "Machine not found" };
        }
        return { machine };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});



server.post("/api/washing", async (request, reply) => {
    try {
        const id = await addMachine();
        return { id };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});

server.put<{ Params: { id: string }, Body: { coin: number } }>("/api/washing/coin/:id", async (request, reply) => {
    const id = parseInt(request.params.id);
    const { coin } = request.body;
    try {
        await insertCoin(id, coin);
        return { id };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});

server.put<{ Params: { id: string }, Body: { timeLeft: string } }>("/api/washing/time/:id", async (request, reply) => {
    const id = parseInt(request.params.id);
    const { timeLeft } = request.body;
    try {
        await updateTimeLeft(id, timeLeft);
        return { id };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});

server.put<{ Params: { id: string }, Body: { status: string } }>("/api/washing/status/:id", async (request, reply) => {
    const id = parseInt(request.params.id);
    const { status } = request.body;
    try {
        await updateStatus(id, status);
        return { id };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});

server.delete<{ Params: { id: string } }>("/api/washing/:id", async (request, reply) => {
    const id = parseInt(request.params.id);
    try {
        await deleteMachine(id);
        return { id };
    } catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
});

server.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
