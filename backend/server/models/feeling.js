const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const feelingSchema = new Schema({
  text: String,
  date: String,
});

module.exports = mongoose.model("feeling", feelingSchema);
