const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Database gagal terkoneksi");
    console.log(err);
  } else {
    console.log("Database berhasil terkoneksi");
    connection.release();

    const addColumnIfNotExist = (table, column, definition) => {
      db.query(`SHOW COLUMNS FROM ${table} LIKE '${column}'`, (err, results) => {
        if (!err && results.length === 0) {
          db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (err) => {
            if (err) {
              console.error(`Error adding column '${column}' to '${table}':`, err.message);
            } else {
              console.log(`Column '${column}' successfully added to table '${table}'.`);
            }
          });
        }
      });
    };
    
    // Create products table
    db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) DEFAULT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        sold INT DEFAULT 0,
        image VARCHAR(255) DEFAULT NULL,
        category VARCHAR(255) DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'active',
        seller_id INT DEFAULT 3,
        category_id INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error("Error creating table 'products':", err.message);
      } else {
        // Run migrations for products
        addColumnIfNotExist("products", "slug", "VARCHAR(255) DEFAULT NULL");
        addColumnIfNotExist("products", "sold", "INT DEFAULT 0");
        addColumnIfNotExist("products", "status", "VARCHAR(50) DEFAULT 'active'");
        addColumnIfNotExist("products", "seller_id", "INT DEFAULT 3");
        addColumnIfNotExist("products", "category_id", "INT DEFAULT 1");

        // Create orders table
        db.query(`
          CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customerName VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            address TEXT,
            note TEXT,
            total DECIMAL(10, 2) NOT NULL,
            totalItem INT NOT NULL,
            status VARCHAR(50) DEFAULT 'Pending',
            customer_id INT DEFAULT NULL,
            seller_id INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            console.error("Error creating table 'orders':", err.message);
          } else {
            // Run migrations for orders
            addColumnIfNotExist("orders", "customer_id", "INT DEFAULT NULL");
            addColumnIfNotExist("orders", "seller_id", "INT DEFAULT NULL");

            // Create order_items table
            db.query(`
              CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                qty INT NOT NULL,
                seller_id INT DEFAULT NULL,
                category_id INT DEFAULT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
              )
            `, (err) => {
              if (err) {
                console.error("Error creating table 'order_items':", err.message);
              } else {
                // Run migrations for order_items
                addColumnIfNotExist("order_items", "seller_id", "INT DEFAULT NULL");
                addColumnIfNotExist("order_items", "category_id", "INT DEFAULT NULL");
              }
            });
          }
        });
      }
    });
  }
});

module.exports = db;