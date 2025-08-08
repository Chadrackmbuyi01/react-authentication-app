//const {response} = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Chadsmith2024",
  host: "localhost",
  port: 5432,
  database: "react_login",
});

// const createTbleQuery = `CREATE TABLE accounts (
// 	user_id serial PRIMARY KEY,
// 	username VARCHAR (50) UNIQUE NOT NULL,
// 	password VARCHAR (50) UNIQUE NOT NULL
// )`;

// pool
//   .query(createTbleQuery)
//   .then((response) => {
//     console.log("Database created successfully.");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error("Error creating database:", err);
//   });
module.exports = pool;
