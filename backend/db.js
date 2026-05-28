require("dotenv").config({ path: `${__dirname}/.env` });

const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "item_management",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed");

    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error(
        `MySQL rejected user "${dbConfig.user}" on "${dbConfig.host}". Check DB_USER and DB_PASSWORD in backend/.env.`
      );
    } else if (err.code === "ER_BAD_DB_ERROR") {
      console.error(
        `Database "${dbConfig.database}" does not exist. Create it or update DB_NAME in backend/.env.`
      );
    } else {
      console.error(err.message);
    }
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = connection;
