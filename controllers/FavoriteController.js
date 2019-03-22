const db = require(`../models/index.js`);

/**
 * Class Favorite Controller
 */
class FavoriteController {
  /**
   * create a new favorite podcast in database
   * @param {*} req
   * @param {*} res
   */
  create(req, res) {
    db.favorite
      .findOrCreate({ where: req.body })
      .then(favorite => res.json(favorite));
  }

  /**
   * Update the favorite podcast in database
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.favorite
      .update(req.body, { where: req.params })
      .then(favorite => res.json(favorite));
  }

  /**
   * Remove a favorite podcast in database
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.favorite
      .destroy({ where: req.params })
      .then(favorite => res.json(favorite));
  }
}

module.exports = FavoriteController;
