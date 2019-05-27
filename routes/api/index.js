const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoute");
const postRoutes = require("./postRoute");
const favoriteRoutes = require("./favoriteRoute");
const commentRoute = require("./commentRoute");
const awsRoute = require("./awsRoute");

// User routes
router.use("/users", userRoutes);

// Post Routes
router.use("/posts", postRoutes);

// Favorite Routes
router.use("/favorites", favoriteRoutes);

// Favorite Routes
router.use("/comments", commentRoute);

// AWS Routes
router.use("/aws", awsRoute);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
