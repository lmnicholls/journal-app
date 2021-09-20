const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const NoteSchema = new Schema({
  note: String,
  checked: Boolean,
});

module.exports = mongoose.model("note", NoteSchema);
