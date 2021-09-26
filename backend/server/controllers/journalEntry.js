const JournalEntry = require("../models/journal");
const User = require("../models/user");

exports.addEntryToJournal = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send("Title is required.");
  }

  if (!req.body.date) {
    return res.status(400).send("Date is required.");
  }

  if (!req.body.entry) {
    return res.status(400).send("Entry is required.");
  }

  const user = User.findById(req.user._id);

  if (!user) {
    return res.status(404).send("user not found");
  }

  const newEntry = new JournalEntry({
    title: req.body.title,
    date: req.body.date,
    entry: req.body.entry,
  });

  newEntry.save();

  const savedEntry = JournalEntry.findById(newEntry._id);

  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { entries: newEntry } },
    (err, user) => {
      if (err) {
        return res.send(err);
      }
    }
  ).populate({ path: "entries" });
};

exports.deleteEntry = async (req, res) => {
  const entry = await JournalEntry.findById(req.params.entryID);
  const user = await User.findById(req.user._id);
  const update = { $pull: { entries: entry._id } };

  await JournalEntry.deleteOne({ _id: entry._id });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    update,
    (err, user) => {
      if (err) {
        return err;
      }
    }
  ).populate({ path: "entries" });

  res.json({ deletedEntry: entry, updatedUser });
};

exports.getJournal = async (req, res) => {
  const response = await User.findById(req.user._id).populate({
    path: "entries",
  });

  if (response) res.status(200).send(response);

  return response;
};

exports.editEntry = async (req, res) => {
  const entry = await JournalEntry.findById(req.params.entryID);
  const title = req.body.title;
  const entryContent = req.body.entry;

  let updatedEntry = await JournalEntry.findByIdAndUpdate(
    entry._id,
    {
      $set: { title: title, entry: entryContent },
    },
    { new: true },
    (err, entry) => {
      if (err) {
        return res.send(entry);
      }
    }
  );

  res.status(200).send(updatedEntry);

  const response = await User.findById(req.user._id).populate({
    path: "entries",
  });
};
