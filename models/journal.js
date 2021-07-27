const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const journalEntrySchema = new Schema({
  id: Number,
  title: String,
  // what type is the text rich editor?
  entry: String,
});

const JournalEntryModel = mongoose.model("journal", journalEntrySchema);

module.exports = {
  JournalEntryModel,
  JournalEntrySchema: journalEntrySchema,
};
