const createUserTableQuery = `CREATE TABLE IF NOT EXISTS user (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  contact_no TEXT,
  address TEXT,
  profile_image BLOB DEFAULT 'https://i.stack.imgur.com/l60Hf.png'
)`;

const createOrdersTableQuery = `CREATE TABLE IF NOT EXISTS orders (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  orderid TEXT NOT NULL,
  date TEXT NOT NULL,
  contact TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL
)`;

const createOrderItemsTableQuery = `CREATE TABLE IF NOT EXISTS order_items (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  orderid TEXT NOT NULL,
  itemid TEXT NOT NULL,
  name TEXT NOT NULL,
  count INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY(orderid) REFERENCES orders(orderid)
)`;

const createTables = (db) => {
  db.run(createUserTableQuery, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("User Table created.");
    }
  });

  db.run(createOrdersTableQuery, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Orders Table created.");
    }
  });

  db.run(createOrderItemsTableQuery, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Order Items Table created.");
    }
  });
};

module.exports = {
  createTables,
};
