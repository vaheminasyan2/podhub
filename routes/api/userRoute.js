const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const controller = new UserController();

/**
 * Route to get all existing users
 * @param {*} req
 * @param {*} res
 */
router.get("/:id", (req, res) => {
    controller.getUsersList(req, res);
});

/**
 * Route to follow a user
 * @param {*} req
 * @param {*} res
 */
router.post("/follow", (req, res) => {
    controller.postFollowUser(req, res);
});

/**
 * Route to create a new user in database or get userDetails by userId for exisiting user
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => {
    console.log("[Route] User : GET", req.query.id_token);
    controller.getOrCreate(req, res);
});

/**
 * Route to get isFollowing by userId from database
 * @param {*} req
 * @param {*} res
 */
router.get("/isFollowing/:id", (req, res) => {
    console.log(req.params)
    controller.findIsFollowing(req, res)
});

/**
 * Route to get followedBy by userId from database
 * @param {*} req
 * @param {*} res
 */
router.get("/followedBy/:id", (req, res) => controller.findFollowedBy(req, res));

/**
 * Route to update the existing user
 * @param {*} req
 * @param {*} res
 */
router.get("/update/:id", (req, res) => controller.update(req, res));

/**
 * Route to remove the existing user
 * @param {*} req
 * @param {*} res
 */
router.get("/remove/:id", (req, res) => controller.remove(req, res));

/**
 * Get all posts for the user <<--------------User Profile page------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/posts", (req, res) => controller.getPosts(req, res));

/**
 * Get user followings posts <<--------------Home page------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/followings/posts", (req, res) => controller.getFollowingsPosts(req, res));

module.exports = router;
