const JournalEntry = require("../models/journal");
const User = require("../models/user");

exports.addEntryToJournal = function (req, res) {
  console.log(req.body);
  User.findOne({ _id: req.user._id }, function (err, user) {
    const entry = new JournalEntry.JournalEntryModel(req.body);

    entry.save(function (err, entry) {
      user.entries.push(entry);

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
      entries: user.entries,
    });
  });
};
