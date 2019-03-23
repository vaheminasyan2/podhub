const router = require("express").Router();
const PostController = require("../../controllers/PostController");
const controller = new PostController();

/**
 * Route to create a new post in database
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => controller.create(req, res));

/**
 * Route to update the existing post
 * @param {*} req
 * @param {*} res
 */
router.get("/update/:id", (req, res) => controller.update(req, res));

/**
 * Route to remove the existing post
 * @param {*} req
 * @param {*} res
 */
router.delete("/:id", (req, res) => controller.remove(req, res));


// get comments

router.get("/:id/comments", (req, res) => controller.getPostComments(req, res));

router.get("/:id/likes", (req, res) => controller.getPostLikes(req, res));

// For test only
router.get("/:id", (req, res) => res.json("HELLO " + req.params.id));

module.exports = router;
