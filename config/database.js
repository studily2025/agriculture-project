require('dotenv').config();


const {createPool} = require('mysql');
const pool = createPool({
    host : process.env.HOST,
     port: process.env.DB_PORT,
    user :process.env.USER,
    password :process.env.PASSWORD,
    database:process.env.DATABASE,
     multipleStatements: true,

})
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL!");
    connection.release(); // Release the connection back to the pool
  }
});
module.exports=pool