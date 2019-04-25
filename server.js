require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./models");
const routes = require("./routes/");
const Notification = require("./routes/notification");

var app = express();
const http = require("http").Server(app);

var PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/build"));

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

app.use(routes);

const notification = new Notification(http);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports.app = app;
module.exports.notification = notification;
