const User = require("../models/user");
const Postit = require("../models/postit");
const mongo = require("mongodb");

exports.addPostit = function (req, res) {
  if (!req.body.postit) {
    return res.status(400).send("Postit text is required.");
  }
  const user = User.findById(req.user._id);

  if (!user) {
    return res.status(404).send("user not found");
  }

  const newPostit = new Postit({
    postit: req.body.postit,
    rotate: req.body.rotate,
    x: req.body.x,
    y: req.body.y,
  });

  newPostit.save();

  const savedPostit = Postit.findById(newPostit._id);

  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { postits: newPostit } },
    (err, user) => {
      if (err) {
        return res.send(err);
      }
    }
  ).populate({ path: "postits" });
};

exports.fetchPostits = async (req, res) => {
  const response = await User.findById(req.user._id).populate({
    path: "postits",
  });
  if (response) res.status(200).send(response);

  return response;
};

exports.deletePostit = async (req, res) => {
  const postit = await Postit.findById(req.params.postitID);
  const user = await User.findById(req.user._id);
  const update = { $pull: { postits: postit._id } };

  await Postit.deleteOne({ _id: postit._id });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    update,
    (err, user) => {
      if (err) {
        return err;
      }
    }
  ).populate({ path: "postits" });

  res.json({ deletedPostit: postit, updatedUser });
};

exports.editPostitPosition = async (req, res) => {
  const postit = await Postit.findById(req.params.postitID);
  const user = await User.findById(req.user._id);
  let updatedPostit = await Postit.findByIdAndUpdate(
    postit._id,
    {
      $set: { x: req.body.x, y: req.body.y },
    },
    { new: true },
    (err, postit) => {
      if (err) {
        return res.send(err);
      }
    }
  );
  res.status(200).send(updatedPostit);

  const response = await User.findById(req.user._id).populate({
    path: "postits",
  });
};
