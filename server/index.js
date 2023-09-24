import express from "express";
import mysql from "mysql";
import cors from "cors";

// const express = require("express");
const app = express();
// require("dotenv").config();
const port = process.env.PORT || 8800;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pbj@123",
  database: "crud_books",
});

// IF THERE IS ANY AUTH ERROR => FOR PASSWORD ERROR
// THEN RUN THE FOLLOWING COMMAND ON MySQL Workbench
// ALTER USER 'root'@'localhost' IDENTIFIED BY 'Pbj@123';

app.use(express.json());

// to connect with client side
app.use(cors());


// connected to server => port number 8800
app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

// fetching data from database
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    // "title from server side",
    // "desc from server side",
    // "cover from server side",

    // add data from client side
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
