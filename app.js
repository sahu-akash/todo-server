const cors = require("cors");
const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const todoitems = require("./todoItems.json");
const app = express();
app.use(cors());
const m = JSON.parse(fs.readFileSync("./todoItems.json").toString());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//takes us to the root(/) URL
app.get("/", function (req, res) {
  return res.status(200).send(m.items);
});

// endpoint can be used to update the “Done or pending”
app.patch("/modify/:id", function (req, res) {
  console.log("modify status", req.body.status);
  let flag = 0;
  for (let i = m.items.length - 1; i >= 0; i--) {
    if (m.items[i].id === req.params.id) {
      if (req.body.status === "Done" || req.body.status === "Pending") {
        m.items[i].status = req.body.status;
        flag++;
        return fs.writeFile(
          "./todoItems.json",
          JSON.stringify(m),
          "utf8",
          function () {
            res.status(200).send({ success: true, Updates: m.items[i] });
          }
        );
      }
    }
  }
  if (flag <= 0) {
    return res.status(400).send({ success: false, message: "invalid item" });
  }
});

// Add new items todo list
app.post("/store-data", function (req, res) {
  console.log("current len",m.items.length);
  let createId = uuidv4();
  if (!req.body.item) {
    return res.status(400).send({ success: false, message: "invalid item" });
  }
  m.items.push({ id: createId, item: req.body.item, status: "Pending" });
  fs.writeFileSync("./todoItems.json", JSON.stringify(m), "utf8");
  console.log("after save len",m.items.length);

  return res
    .status(200)
    .send({ success: true, message: "added successfully", id: createId });
});

// Delete todo items
app.delete("/delete", (req, res) => {
  console.log("delete stuff");
  const afterDelete = { items: "" };
  afterDelete.items = m.items.filter((item) => item.id !== req.body.id);
  return fs.writeFile(
    "./todoItems.json",
    JSON.stringify(afterDelete),
    "utf8",
    function () {
      res.send({ success: true, id: req.body.id });
    }
  );
});

module.exports = app;
