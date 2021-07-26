const JournalEntry = require("../models/journal");
const User = require("../models/user");

exports.addEntryToJournal = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    const entry = new JournalEntry.JournalEntryModel(
      req.body.addEntryToJournal
    );

    journal.save(function (err, entry) {
      user.journal.push(entry);

      user.save(function (err, user) {
        res.send({
          entry,
        });
      });
    });
  });
};

exports.getJournal = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    res.send({
      journal: user.entries,
    });
  });
};
