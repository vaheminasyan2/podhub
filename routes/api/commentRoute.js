const router = require("express").Router();
const CommentController = require("../../controllers/CommentController");
const controller = new CommentController();

/**
 * Route to create a new comment in database
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => controller.create(req, res));

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
router.delete("/:id", (req, res) => controller.remove(req, res));

/**
 * Get Comment likes
 * @param {*} req
 * @param {*} res
 */
router.get("/:id/likes", (req, res) => controller.getCommentLikes(req, res));

module.exports = router;
