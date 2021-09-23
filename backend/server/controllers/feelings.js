const User = require("../models/user");
const Feeling = require("../models/feeling");

exports.addFeeling = function (req, res) {
  if (!req.body.feeling) {
    return res.status(400).send("Feeling is required.");
  }

  if (!req.body.date) {
    return res.status(400).send("Date is required.");
  }

  const user = User.findById(req.user._id);

  if (!user) {
    return res.status(404).send("user not found");
  }

  const newFeeling = new Feeling({
    text: req.body.feeling,
    date: req.body.date,
  });

  newFeeling.save();

  const savedFeeling = Feeling.findById(newFeeling._id);

  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { feelings: newFeeling } },
    (err, user) => {
      if (err) {
        return res.send(err);
      }
    }
  ).populate({ path: "feelings" });
};

exports.getFeelings = async (req, res) => {
  const response = await User.findById(req.user._id).populate({
    path: "feelings",
  });
  if (response) res.status(200).send(response);

  return response;
};
