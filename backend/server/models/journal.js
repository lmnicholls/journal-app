const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const journalEntrySchema = new Schema({
  id: Number,
  title: String,
  date: String,
  entry: Object,
});

const JournalEntryModel = mongoose.model("journal", journalEntrySchema);

module.exports = {
  JournalEntryModel,
  JournalEntrySchema: journalEntrySchema,
};
