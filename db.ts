import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'washingMachine.db');
const db = new sqlite3.Database(dbPath);

// Initialize the database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS machines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT,
    inUse BOOLEAN,
    coin INTEGER,
    timeLeft TEXT
  )`);
});

export const getAllMachines = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM machines", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const getMachine = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM machines WHERE id = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

export const addMachine = (status: string, inUse: boolean, coin: number, timeLeft: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO machines (status, inUse, coin, timeLeft) VALUES (?, ?, ?, ?)`,
            [status, inUse, coin, timeLeft],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
};

export const insertCoin = (id: number, coin: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE machines SET coin = coin + ? WHERE id = ?", [coin, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const updateTimeLeft = (id: number, timeLeft: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE machines SET timeLeft = ? WHERE id = ?", [timeLeft, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export const updateStatus = (id: number, status: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE machines SET status = ? WHERE id = ?", [status, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export const deleteMachine = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM machines WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}