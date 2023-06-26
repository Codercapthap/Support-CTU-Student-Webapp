const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "ct446",
});

connection.connect((err) => {
  if (err) {
    console.log(`Can't connect to Database ${process.env.DB_NAME}`, err);
    process.exit();
  }

  console.log(
    `Database ${process.env.DB_NAME} has been connected. ThreadId = ${connection.threadId}`
  );
});

/**
 * const mySQLConnection = mysql.createConnection({
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USERNAME || 'admin',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_NAME || 'ct466'
});

mySQLConnection.connect((err: Error) => {
   if (err) {
      console.log(`Can't connect to Database ${process.env.DB_NAME}`, err);
      process.exit();
   }
   console.log(`Database ${process.env.DB_NAME} has connected!`);
});

 */

module.exports = connection;
