const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const controller = new UserController();

/**
 * Route to create a new user in database
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => controller.create(req, res));

/**
 * Route to get userDetails by userId from database
 * @param {*} req
 * @param {*} res
 */
router.get("/:id", (req, res) => controller.findAll(req, res));

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

router.get("/:id/posts", (req, res) => controller.getPosts(req, res));

module.exports = router;
