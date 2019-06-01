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
 * Route to create a new user in database or get userDetails by userId for exisiting user
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => {
    console.log("[Route] User : GET", req.query.id_token);
    controller.getOrCreate(req, res);
});

/**
 * Route to get individual user
 * @param {*} req
 * @param {*} res
 */
router.get("/getUser/:userId", (req, res) => {
    controller.getUser(req, res);
});

/**
 * Route to get user Profile Header section
 * @param {*} req
 * @param {*} res
 */
router.get("/getProfileHeader/:googleId", (req, res) => {
    controller.getProfileHeader(req, res);
});

/**
 * Route to get isFollowing by userId from database <----- user Profile Page ----->
 * @param {*} req
 * @param {*} res
 */
router.get("/isFollowing/:id", (req, res) => {
    console.log(req.params)
    controller.findIsFollowing(req, res)
});

/**
 * Route to get followedBy by users count <----- user Profile Page ----->
 * @param {*} req
 * @param {*} res
 */
router.get("/followedBy/:id", (req, res) => controller.findFollowedBy(req, res));


/**
 * Route to get isFollowing userDetails from database <----- user Profile Page ----->
 * @param {*} req
 * @param {*} res
 */
router.get("/isFollowingUsers/:id", (req, res) => {
    console.log(req.params)
    controller.findIsFollowingUser(req, res)
});

/**
 * Route to get followedBy userDetails <----- user Profile Page ----->
 * @param {*} req
 * @param {*} res
 */
router.get("/followedByUsers/:id", (req, res) => controller.findFollowedByUser(req, res));

/**
 * Route to get followings by user
 * @param {*} req
 * @param {*} res
 */
router.get("/followings/:id", (req, res) => controller.findFollowings(req, res));


/**
 * Route to update the existing user
 * @param {*} req
 * @param {*} res
 */
router.put("/update/:id", (req, res) => controller.update(req, res));

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

/**
 * Route to follow a user
 * @param {*} req
 * @param {*} res
 */
router.post("/follow", (req, res) => {
    controller.postFollowUser(req, res);
});

/**
 * Route to remove user follow link - unfollow
 * @param {*} req
 * @param {*} res
 */
router.post("/unfollow", (req, res) => controller.unFollow(req, res));

/**
 * Get Notifications <<--------------Notification page------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/notifications", (req, res) => controller.getNotifications(req, res));


/**
 * Put Last Checked Notifications <<--------------Notification page------------->>
 * @param {*} req
 * @param {*} res
 */
router.put("/:id/lastCheckedNotification", (req, res) => controller.update(req, res));


/**
 * Get if new notifications are available for user <<--------------Login------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/isNewnotification", (req, res) => controller.isNewNotification(req, res));


module.exports = router;
