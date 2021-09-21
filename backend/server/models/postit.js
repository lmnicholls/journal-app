const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const PostitSchema = new Schema({
  postit: String,
  rotate: Number,
  x: String,
  y: String,
});

module.exports = mongoose.model("postit", PostitSchema);
