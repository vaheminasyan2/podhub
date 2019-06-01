const router = require("express").Router();
const AWSController = require("../../controllers/AWSController");
const controller = new AWSController();

/**
 * Route to upload image to AWS S3
 * @param {*} req
 * @param {*} res
 */
router.post("/awsImageUpload/:userId", (req, res) =>
  controller.awsImageUpload(req, res)
);

/**
 * Route to get image url from AWS S3
 * @param {*} req
 * @param {*} res
 */
router.get("/awsGetImageUrl/:userId", (req, res) =>
  controller.awsGetImageUrl(req, res)
);

module.exports = router;
