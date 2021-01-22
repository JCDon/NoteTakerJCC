const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/class");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", function(req, res) {
    notes.getNote().then((data) => res.json(data)).catch(err => res.status(500).json(err));
  });


app.post("/api/notes", function(req, res) {
    notes.addNote(req.body).then((data) => res.json(data)).catch(err => res.status(500).json(err));

  });


app.delete("/api/notes/:id", function(req, res) {
    notes.deleteNote(req.params.id).then(() => res.json({ok:true})).catch(err => res.status(500).json(err));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// listening for the server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });