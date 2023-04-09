const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./user.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    } 
});

const sql = `CREATE TABLE IF NOT EXISTS user(ID INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,password TEXT NOT NULL)`;
db.run(sql, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Table created.');
    }
});
