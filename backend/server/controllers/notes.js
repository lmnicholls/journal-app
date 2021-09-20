const User = require("../models/user");
const Note = require("../models/note");
const mongo = require("mongodb");

exports.addNote = function (req, res) {
  if (!req.body.note) {
    return res.status(400).send("Note is required.");
  }
  const user = User.findById(req.user._id);

  if (!user) {
    return res.status(404).send("user not found");
  }

  const newNote = new Note({
    note: req.body.note,
    checked: req.body.checked,
  });

  newNote.save();

  const savedNote = Note.findById(newNote._id);

  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { notes: newNote } },
    (err, user) => {
      if (err) {
        return res.send(err);
      }
    }
  ).populate({ path: "notes" });
};

exports.getNotes = async (req, res) => {
  const response = await User.findById(req.user._id).populate({
    path: "notes",
  });
  if (response) res.status(200).send(response);

  return response;
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.noteID);
  const user = await User.findById(req.user._id);
  const update = { $pull: { notes: note._id } };

  await Note.deleteOne({ _id: note._id });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    update,
    (err, user) => {
      if (err) {
        return err;
      }
    }
  ).populate({ path: "notes" });

  res.json({ deletedNote: note, updatedUser });
};

exports.editNoteCheck = async (req, res) => {
  const note = await Note.findById(req.params.noteID);
  const checked = req.body.checkStatus;

  let updatedNote = await Note.findByIdAndUpdate(
    note._id,
    {
      $set: { checked: !checked },
    },
    { new: true },
    (err, note) => {
      if (err) {
        return res.send(err);
      }
    }
  );

  res.status(200).send(updatedNote);

  const response = await User.findById(req.user._id).populate({
    path: "notes",
  });
};
