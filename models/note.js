const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const NoteSchema = new Schema({
  note: String,
  checked: Boolean,
});

const NoteModel = mongoose.model("note", NoteSchema);

module.exports = {
  NoteModel,
  NoteSchema: NoteSchema,
};
