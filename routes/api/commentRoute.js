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
router.delete("/commentUnlikes/:id", (req, res) => controller.removeCommentLikes(req, res));

/**
 * Get Comment likes
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/likes", (req, res) => controller.getCommentLikes(req, res));

module.exports = router;
