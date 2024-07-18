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
    return { washingMachines };
}));
server.get("/api/washing/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const washingMachine = washingMachines.find((wm) => wm.id === id);
    if (!washingMachine) {
        reply.status(404);
        return { error: "Washing machine not found" };
    }
    return washingMachine;
}));
server.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
