"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMachine = exports.updateStatus = exports.updateTimeLeft = exports.insertCoin = exports.addMachine = exports.getMachine = exports.getAllMachines = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__dirname, 'washingMachine.db');
const db = new sqlite3_1.default.Database(dbPath);
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS machines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT,
    inUse BOOLEAN,
    coin INTEGER,
    timeLeft TEXT
  )`);
});
const getAllMachines = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM machines", [], (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
exports.getAllMachines = getAllMachines;
const getMachine = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM machines WHERE id = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
};
exports.getMachine = getMachine;
const addMachine = (status, inUse, coin, timeLeft) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO machines (status, inUse, coin, timeLeft) VALUES (?, ?, ?, ?)`, [status, inUse, coin, timeLeft], function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(this.lastID);
            }
        });
    });
};
exports.addMachine = addMachine;
const insertCoin = (id, coin) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE machines SET coin = coin + ? WHERE id = ?", [coin, id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.insertCoin = insertCoin;
const updateTimeLeft = (id, timeLeft) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE machines SET timeLeft = ? WHERE id = ?", [timeLeft, id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.updateTimeLeft = updateTimeLeft;
const updateStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE machines SET status = ? WHERE id = ?", [status, id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.updateStatus = updateStatus;
const deleteMachine = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM machines WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.deleteMachine = deleteMachine;
