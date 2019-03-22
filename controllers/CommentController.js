const db = require(`../models/index.js`);

/**
 * Class Comment Controller
 */
class CommentController {
  /**
   * create a new comment in database
   * @param {*} req
   * @param {*} res
   */
  create(req, res) {
    db.comment.findOrCreate({ where: req.body }).then(comment => res.json(comment));
  }

  /**
   * Update the comment in database
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.comment
      .update(req.body, { where: req.params })
      .then(comment => res.json(comment));
  }

  /**
   * Remove a comment in database
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.comment.destroy({ where: req.params }).then(comment => res.json(comment));
  }
}

module.exports = CommentController;
