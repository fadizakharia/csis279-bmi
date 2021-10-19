import mysql from "mysql2";

import mysqlPromise from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
let pool: mysql.Pool;
let con: mysql.Connection;
let poolPromise: mysqlPromise.Pool;

let db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 200,
  dateStrings: true,
};

function createCon() {}

export default {
  getPool: function () {
    if (pool) return pool;
    pool = mysql.createPool(db_config);
    return pool;
  },
  getPoolPromise: function () {
    if (poolPromise) return poolPromise;
    poolPromise = mysqlPromise.createPool(db_config);
    return poolPromise;
  },
  createCon: function () {
    if (con) return con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
      if (err) throw err;
      setTimeout(createCon, 2000);
    });
    con.on("error", function (err: mysqlPromise.QueryError) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        createCon();
      } else {
        throw err;
      }
    });
    return con;
  },
};
