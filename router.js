const Authentication = require("./controllers/authentication");
const JournalEntry = require("./controllers/journalEntry");
const Feelings = require("./controllers/feelings");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("/current_user", requireAuth, Authentication.currentUser);
  app.post("/entries", requireAuth, JournalEntry.addEntryToJournal);
  app.get("/entries", requireAuth, JournalEntry.getJournal);
  app.post("/feelings", requireAuth, Feelings.addFeeling);
  app.get("/feelings", requireAuth, Feelings.getFeelings);
};
