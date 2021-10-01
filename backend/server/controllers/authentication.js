const jwt = require("jwt-simple");
const User = require("../models/user");
const keys = require("../config/dev");

function tokenForUser(user) {
  return jwt.encode(
    {
      sub: user.id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    keys.TOKEN_SECRET
  );
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({
    token: tokenForUser(req.user),
    firstName: req.user.firstName,
  });
};

exports.currentUser = function (req, res) {
  const user = {
    email: req.user.email,
    token: tokenForUser(req.user),
    firstName: req.user.firstName,
  };

  res.send(user);
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !password || !lastName || !firstName) {
    return res.status(422).send({
      error: "You must provide email, password, first and last name.",
    });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User();

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.setPassword(password);

    user.save(function (err, user) {
      if (err) {
        return next(err);
      }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
