const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const journalEntrySchema = new Schema({
  id: Number,
  title: String,
  date: String,
  entry: Object,
});

module.exports = mongoose.model("journal", journalEntrySchema);
