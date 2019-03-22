const db = require(`../models/index.js`);

/**
 * Class Post Controller
 */
class PostController {
  /**
   * create a new post in database
   * @param {*} req
   * @param {*} res
   */
  create(req, res) {
    db.post.findOrCreate({ where: req.body }).then(post => res.json(post));
  }

  /**
   * Update the post in database
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.post
      .update(req.body, { where: req.params })
      .then(post => res.json(post));
  }

  /**
   * Remove a Post in database
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.post.destroy({ where: req.params }).then(post => res.json(post));
  }
}

module.exports = PostController;
