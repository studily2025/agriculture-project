require('dotenv').config();


// const {createPool} = require('mysql');
const mysql = require('mysql2'); 
const pool = mysql.createPool({
    host : process.env.HOST,
     port: process.env.DB_PORT,
    user :process.env.USER,
    password :process.env.PASSWORD,
    database:process.env.DATABASE,
     multipleStatements: true,
    connectionLimit: 10,
  queueLimit: 0,

  // RDS TLS
  ssl: { rejectUnauthorized: false },
  connectTimeout: 15000,
  acquireTimeout: 15000
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