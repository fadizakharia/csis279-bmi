import { createConnection, QueryError } from "mysql2";
import dotenv from "dotenv";
dotenv.config();
//@ts-ignore
const connection = createConnection({
  host: +process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: process.env.DB_PORT!,
  multipleStatements: true,
  dateStrings: true,
});

function handleDisconnect() {
  connection.connect((error) => {
    if (error) {
      console.log("Error connecting to the database " + error);
      setTimeout(handleDisconnect, 10000);
    } else {
      console.log(
        "==========================================================="
      );
      console.log(
        ">>> ⚙️ Successfully connected to the database " + process.env.DB_NAME!
      );
      console.log(
        "==========================================================="
      );
    }
  });

  connection.on("error", function (err: QueryError) {
    console.log(err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
      console.log("PTP TIPS DATABASE CONNECTION LOST" + err);
      handleDisconnect();
    } else {
      handleDisconnect();
      throw err;
    }
  });
}

handleDisconnect();

export default connection;
