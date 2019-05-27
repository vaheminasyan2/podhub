const router = require("express").Router();
const AWSController = require("../../controllers/AWSController");
const controller = new AWSController();

/**
 * Route to create a new comment in database
 * @param {*} req
 * @param {*} res
*/
router.post("/awsImageUpload/:userId", (req, res) => controller.awsUploadImage(req, res));

module.exports = router;