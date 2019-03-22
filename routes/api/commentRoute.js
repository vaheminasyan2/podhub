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
router.get("/update/:id", (req, res) => controller.update(req, res));

/**
 * Route to remove the existing comment
 * @param {*} req
 * @param {*} res
 */
router.get("/remove/:id", (req, res) => controller.remove(req, res));

module.exports = router;
