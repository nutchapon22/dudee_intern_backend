"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const washingMachines = JSON.parse(fs_1.default.readFileSync(path_1.default.join("washingMachines.json")).toString());
function fibonacci(n) {
    let secqueance = [0, 1];
    for (let i = 2; i < n; i++) {
        secqueance.push(secqueance[i - 1] + secqueance[i - 2]);
    }
    return secqueance;
}
const server = (0, fastify_1.default)();
server.get("/api/v1/test/:n", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const n = parseInt(request.params.n);
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
}));
server.get("/api/washing", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const washingMachines = yield (0, db_1.getAllMachines)();
        return { washingMachines };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.get("/api/washing/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    try {
        const machine = yield (0, db_1.getMachine)(id);
        if (!machine) {
            reply.status(404);
            return { error: "Machine not found" };
        }
        return { machine };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.post("/api/washing", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, inUse, coin, timeLeft } = request.body;
    try {
        const id = yield (0, db_1.addMachine)(status, inUse, coin, timeLeft);
        return { id };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.put("/api/washing/coin/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const { coin } = request.body;
    try {
        yield (0, db_1.insertCoin)(id, coin);
        return { id };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.put("/api/washing/time/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const { timeLeft } = request.body;
    try {
        yield (0, db_1.updateTimeLeft)(id, timeLeft);
        return { id };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.put("/api/washing/status/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const { status } = request.body;
    try {
        yield (0, db_1.updateStatus)(id, status);
        return { id };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.delete("/api/washing/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    try {
        yield (0, db_1.deleteMachine)(id);
        return { id };
    }
    catch (err) {
        reply.status(500);
        return { error: "Internal server error" };
    }
}));
server.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
