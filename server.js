const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/database");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const path = require('path');

const port = process.env.PORT || 3000;




// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.set("view engine", "ejs");
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH"] }))
  .use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Start server
mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.MONGODB_URI !== 'test') {
      app.listen(port, () => {
        console.log(`Database Connected and server running on PORT: ${port}`);
      });
    }
    app.use("/", indexRouter);
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  });




app.use("/", indexRouter);

(err) => {
  console.log("Cannot connect to the database!", err);
  process.exit();
};


module.exports = app;
