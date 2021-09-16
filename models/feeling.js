const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const feelingSchema = new Schema({
  feeling: String,
  date: String,
});

const FeelingModel = mongoose.model("feeling", feelingSchema);

module.exports = {
  FeelingModel,
  FeelingSchema: feelingSchema,
};
