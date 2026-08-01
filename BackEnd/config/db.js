const { Pool } = require("pg");
require("dotenv").config();

// Connect using DATABASE_URL (for production/cloud) or individual parameters
const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "password",
      database: process.env.DB_NAME || "postgres",
      port: Number(process.env.DB_PORT) || 5432,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    };

const pool = new Pool(config);

// Verify Connection & Auto-Migrate Schema
pool.connect((err, client, release) => {
  if (err) {
    console.error("Database gagal terkoneksi:", err.stack);
  } else {
    console.log("Database berhasil terkoneksi ke Supabase PostgreSQL");
    release();

    // Auto-migrate column types to ensure large image payloads (Base64/URLs) are supported
    pool.query("ALTER TABLE products ALTER COLUMN image TYPE TEXT;", (migErr) => {
      if (migErr) {
        // Table or column might already be TEXT or not exist yet
      } else {
        console.log("Migration: Column products.image successfully updated to TEXT");
      }
    });
  }
});

// compatible db object interface matching mysql2 query interface
const db = {
  query: (sql, params, callback) => {
    let actualParams = params;
    let actualCallback = callback;
    if (typeof params === "function") {
      actualCallback = params;
      actualParams = [];
    }

    // Convert MySQL placeholders (?) to PostgreSQL placeholders ($1, $2, etc.)
    let pgSql = sql;
    let paramIndex = 1;
    while (pgSql.includes("?")) {
      pgSql = pgSql.replace("?", `$${paramIndex++}`);
    }

    // Auto-append RETURNING id for INSERT queries to mimic insertId behavior
    if (/^\s*insert\s+into/i.test(pgSql) && !/returning/i.test(pgSql)) {
      pgSql += " RETURNING id";
    }

    pool.query(pgSql, actualParams, (err, res) => {
      if (err) {
        if (actualCallback) actualCallback(err, null);
        return;
      }

      // Map PG results to look exactly like mysql2 results array
      const mappedRows = res.rows ? [...res.rows] : [];
      
      // Attach properties directly to the array so it acts as mysql2 result metadata
      const insertId = res.rows && res.rows[0] && res.rows[0].id ? Number(res.rows[0].id) : null;
      
      // Inject helper properties directly onto the array object
      Object.defineProperties(mappedRows, {
        insertId: { value: insertId, writable: true, enumerable: false },
        affectedRows: { value: res.rowCount, writable: true, enumerable: false }
      });

      if (actualCallback) {
        actualCallback(null, mappedRows);
      }
    });
  },
  end: () => pool.end()
};

module.exports = db;