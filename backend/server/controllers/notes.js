const User = require("../models/user");
const Note = require("../models/note");
const mongo = require("mongodb");

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
  var ObjectID = require("mongodb").ObjectID;
  const id = req.params.noteID;
  const userID = new ObjectID(req.user._id);

  Note.NoteModel.findByIdAndRemove(id, function (err, note) {
    console.log("findByIdAndRemove note: ", note);
    Note.NoteModel.find({}, function (err, notes) {
      console.log("Finding all: ", notes);
    });
  });

  User.findByIdAndUpdate(
    { _id: userID },
    { $pull: { notes: { _id: new mongo.ObjectId(id) } } },
    { new: true },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.editNoteCheck = function (req, res) {
  var ObjectID = require("mongodb").ObjectID;
  const id = req.params.noteID;
  const checked = req.body.checkStatus;
  const userID = new ObjectID(req.user._id);

  Note.NoteModel.updateOne(
    { _id: new mongo.ObjectId(id) },
    { $set: { checked: !checked } }
  );

  // User.findByIdAndUpdate(
  //   { _id: userID },
  //   { $set: { notes: { _id: new mongo.ObjectId(id) } } },
  //   { new: true },
  //   function (err, result) {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.send(result);
  //     }
  //   }
  // );
  res.send("done");
};
