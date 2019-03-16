const express = require("express");
const routes = require("./routes")
const PORT = process.env.PORT || 3001;
const app = express();

// const MySQL

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
//app.use(express.static("public"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to MySQL database



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
