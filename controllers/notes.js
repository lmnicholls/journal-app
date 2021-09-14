const User = require("../models/user");
const Note = require("../models/notes");

exports.addNote = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    if (!req.body.note) {
      return res.status(400).send("Note is required.");
    }

    const note = new Note.NoteModel(req.body);

    note.save(function (err, note) {
      user.notes.push(note);

      user.save(function (err, user) {
        res.send({
          note,
        });
      });
    });
  });
};

exports.getNotes = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    res.send({
      notes: user.notes,
    });
  });
};
