const router = require("express").Router();
const FavoriteController = require("../../controllers/FavoriteController");
const controller = new FavoriteController();

/**
 * Route to create a new favorite podcast in database
 * @param {*} req
 * @param {*} res
 */
router.post("/", (req, res) => controller.create(req, res));

/**
 * Route to update the existing favorite podcast in database
 * @param {*} req
 * @param {*} res
 */
router.get("/update/:id", (req, res) => controller.update(req, res));

/**
 * Route to remove the existing favorite podcast in database
 * @param {*} req
 * @param {*} res
 */
router.get("/remove/:id", (req, res) => controller.remove(req, res));

module.exports = router;
