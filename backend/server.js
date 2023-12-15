const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/addtask", (req, res) => {
  const { task } = req.body;
  const query = "INSERT INTO list (lists) VALUES (?)";
  
  connection.query(query, [task], (err, results) => {
    if (err) {
      console.error("Error adding list:", err);
      res.status(500).json({ error: "Failed to add list" });
      return;
    }
    res.send("list added successfully");
  });
});

app.get("/alltask", (req, res) => {
  const query = "SELECT * FROM list";
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching lists:", err);
      res.status(500).json({ error: "Failed to fetch list" });
      return;
    }
    res.json(results);
  });
});

app.delete("/deletetask/:Id", (req, res) => {
  const Id = req.params.Id;
  const query = "DELETE FROM list WHERE id = ?";

  connection.query(query, [Id], (err, results) => {
    if (err) {
      console.error("Error deleting list:", err);
      res.status(500).json({ error: "Failed to delete list" });
      return;
    }
    res.send("List deleted successfully");
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
