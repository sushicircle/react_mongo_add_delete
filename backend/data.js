// moongoose schema https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
const DataSchema = new Schema(
  {
    id: Number,
    message: String,
    date: Date
  },
  { timestamps: true }
);

// export to modify with Node.js
module.exports = mongoose.model("Data", DataSchema);