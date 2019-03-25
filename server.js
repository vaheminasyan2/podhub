require("dotenv").config();
const express = require("express");
const path = require("path")
const db = require("./models");
const routes = require("./routes/");

var app = express();
var PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/build"));

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

app.use(routes);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
