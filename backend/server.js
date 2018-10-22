var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var Data = require("./data");

var API_PORT = 3001;
var app = express();
var router = express.Router();

// MongoDB from mathlab; credentials needs to be changed
var mongoDB = "mongodb://user:password@ds139193.mlab.com:39193/mern_planner_db";

// connects our back end code with the database
mongoose.connect(
    mongoDB,
  { useNewUrlParser: true }
);

var db = mongoose.connection;

db.once("open", () => console.log("connected to db"));

// checks if success
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//put schema in data.js

// get method
// fetch all data
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// delete method
router.delete("/deleteData", (req, res) => {
  var { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// create methid
// adds new data
router.post("/putData", (req, res) => {
  let data = new Data();

  var { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));