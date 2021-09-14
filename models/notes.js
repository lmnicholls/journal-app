const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const noteSchema = new Schema({
  note: String,
  checked: Boolean,
});

const NoteModel = mongoose.model("notes", noteSchema);

module.exports = {
  NoteModel,
  NoteSchema: noteSchema,
};
