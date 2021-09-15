const User = require("../models/user");
const Note = require("../models/note");

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

exports.deleteNote = function (req, res) {
  const noteID = req.params.noteID;

  const user = User.findById(req.user._id);
  const note = Note.NoteModel.findById(noteID);

  const update = { $pull: { notes: { _id: noteID } } };
  const noteUpdate = { $pull: { note: { _id: noteID } } };

  Note.NoteModel.findOneAndUpdate({ _id: noteID }, noteUpdate, { new: true });

  const updatedUser = User.updateOne({ _id: user._id }, update, { new: true });

  res.json("note deleted");
};
