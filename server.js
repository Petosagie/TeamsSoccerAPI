const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/database");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const cors = require("cors");

const port = process.env.PORT || 3000;

// Boody parser, this makes the req body readable
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


// Start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    if (process.env.MONGODB_URI !== 'test') {
      app.listen(port, () => {
        console.log(`Database Connected and server running on PORT: ${port}`);
      });
    }
    // Main router
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

