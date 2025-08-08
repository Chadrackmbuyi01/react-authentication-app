const express = require("express");
const cors = require("cors");
const pool = require("./database"); // Assuming database.js is in the same directory
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/adduser", (req, res) => {
//   console.log(req.body);
//   res.send("Response received: " + req.body);
// });

app.post("/adduser", (req, res) => {
  const { username, password } = req.body;

  console.log("Username:" + username);
  console.log("Password:" + password);

  //const hashedPassword = bcrypt.hash(password, 10);

  const insertSTMT = `INSERT INTO accounts (username, password) VALUES ('${username}', '${password}');`;

  pool
    .query(insertSTMT)
    .then((response) => {
      console.log("User has been created successfully.");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response received: " + req.body);
});

app.get("/users", (req, res) => {
  const selectSTMT = `SELECT * FROM accounts;`;
  console.log("Retrieving all users...");

  const request = req.body;
  console.log("Request body:", request);
  pool
    .query(selectSTMT)
    .then((response) => {
      console.log("Users retrieved successfully.");
      console.log(response.rows);
      res.json(response.rows);
    })
    .catch((err) => {
      console.error("Error retrieving users:", err);
      res.status(500).send("Error retrieving users");
    });
});

app.put("/updateuser", (req, res) => {
  const { user_id, username, password } = req.body;

  console.log("Updating user with ID:", user_id);
  console.log("New Username:", username);
  console.log("New Password:", password);

  const updateSTMT = `UPDATE accounts SET username = '${username}', password = '${password}' WHERE user_id = ${user_id};`;

  pool
    .query(updateSTMT)
    .then((response) => {
      console.log("User updated successfully.");
      console.log(response.rowCount, "row(s) updated.");
      res.send("User updated successfully.");
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
    });
});

app.delete("/deleteuser/:id", (req, res) => {
  const userId = req.params.id;

  console.log("Deleting user with ID:", userId);

  const deleteSTMT = `DELETE FROM accounts WHERE user_id = ${userId};`;

  pool
    .query(deleteSTMT)
    .then((response) => {
      console.log("User deleted successfully.");
      console.log(response.rowCount, "row(s) deleted.");
      res.send("User deleted successfully.");
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    });
});
// This is the main entry point for the server application.
app.get("/", (req, res) => {
  res.send("Welcome to the React Login Server!");
});

app.listen(4000, () => console.log("Server is running on port: 4000"));
