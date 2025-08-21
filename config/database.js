require('dotenv').config();             
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT) || 10,
  ssl: process.env.DB_SSL === 'true' ? 'Amazon RDS' : undefined,  // TLS on RDS
  connectTimeout: 10000
 
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL!");
    connection.release(); // Release the connection back to the pool
  }
});
module.exports=pool
