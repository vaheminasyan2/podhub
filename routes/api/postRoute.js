const router = require("express").Router();
const PostController = require("../../controllers/PostController");
const controller = new PostController();

/**
 * Route to create a new post in database
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => controller.create(req, res));

// /**
//  * Route to get posts by userId from database
//  * @param {*} req
//  * @param {*} res
//  */
// router.get("/:id", (req, res) => controller.findAll(req, res));


/**
 * Route to get posts by userId from database <<--------------User Profile page------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/getPostsOnlyByUser/:id", (req, res) => controller.getPostByUser(req, res));




/**
 * Route to update the existing post
 * @param {*} req
 * @param {*} res
 */
router.get("/update/:id", (req, res) => controller.update(req, res));

/**
 * Route to remove the existing post <----- User Profile Page ----->
 * @param {*} req
 * @param {*} res
 */
router.delete("/delete/:id", (req, res) => controller.remove(req, res));


/**
 * Get comments for thea post  <<---------------Profile, Home pages------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/comments", (req, res) => controller.getPostComments(req, res));

/**
 * Get post likes  <<---------------Profile, Home pages------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/likes", (req, res) => controller.getPostLikes(req, res));


module.exports = router;
