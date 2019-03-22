const path = require("path");
const router = require("express").Router();
const userRoutes = require("./userRoute");
const postRoutes = require("./postRoute");
const favoriteRoutes = require("./favoriteRoute");

// User routes
router.use("/user", userRoutes);

// Post Routes
router.use("/post", postRoutes);

// Favorite Routes
router.use("/fav", favoriteRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;