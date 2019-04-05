const router = require("express").Router();
const CommentController = require("../../controllers/CommentController");
const controller = new CommentController();

/**
 * Route to create a new comment in database
 * @param {*} req
 * @param {*} res
*/
router.post("/", (req, res) => controller.createComment(req, res));

/**
 * Route to create likes for comment in database
 * @param {*} req
 * @param {*} res
 */
router.post("/commentLikes", (req, res) => controller.createCommentLikes(req, res));

/**
 * Get users who commented post
 * @param {*} req
 * @param {*} res
 */
router.get("/commentedUserLikes/:id", (req, res) => controller.getCommentedUser(req, res));

/**
 * Route to get users Details who liked comments by commentId from database <<--------------Home Page and User Profile page------------->>
 * @param {*} req
 * @param {*} res
 */
router.get("/getUsersLikedComment/:id", (req, res) => controller.getUsersLikedComment(req, res));

/**
 * Route to update the existing comment
 * @param {*} req
 * @param {*} res
 */
router.put("/:id", (req, res) => controller.update(req, res));

/**
 * Route to remove the existing comment
 * @param {*} req
 * @param {*} res
 */
router.delete("/:id", (req, res) => controller.removeComment(req, res));

/**
 * Route to remove the likes from comments
 * @param {*} req
 * @param {*} res
 */
router.delete("/commentUnlikes/:commentId/:userId", (req, res) => controller.removeCommentLikes(req, res));

/**
 * Get Comment likes
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/likes", (req, res) => controller.getCommentLikes(req, res));

module.exports = router;
