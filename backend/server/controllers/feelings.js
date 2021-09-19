const User = require("../models/user");
const Feeling = require("../models/feeling");

exports.addFeeling = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    if (!req.body.feeling) {
      return res.status(400).send("Feeling is required.");
    }

    if (!req.body.date) {
      return res.status(400).send("Date is required.");
    }

    const feeling = new Feeling.FeelingModel(req.body);

    feeling.save(function (err, feeling) {
      user.feelings.unshift(feeling);

      user.save(function (err, user) {
        res.send({
          feeling,
        });
      });
    });
  });
};

exports.getFeelings = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    res.send({
      feelings: user.feelings,
    });
  });
};
