const JournalEntry = require("../models/journal");
const User = require("../models/user");
const Feeling = require("../models/feelings");

exports.addFeeling = function (req, res) {
  User.findOne({ _id: req.user._id }, function (err, user) {
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

// exports.getFeelings = function (req, res) {
//   User.findOne({ _id: req.user._id }, function (err, user) {
//     res.send({
//       feelings: user.feelings,
//     });
//   });
// };
