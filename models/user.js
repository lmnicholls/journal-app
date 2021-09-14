const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Journal = require("../models/journal");
var crypto = require("crypto");

// Define our model
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userType: String,
  feelings: [{ type: Object }],
  notes: [{ type: Object }],
  email: { type: String, unique: true, lowercase: true },
  hash: String,
  salt: String,
  entries: [{ type: Journal.JournalEntrySchema }],
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.hash === hash;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
