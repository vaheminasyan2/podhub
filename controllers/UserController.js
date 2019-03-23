const db = require(`../models/index.js`);

/**
 * Class User Controller
 */
class UserController {
  /**
   * create a new user in database
   * @param {*} req
   * @param {*} res
   */
  create(req, res) {
    db.user.findOrCreate({ where: req.body }).then(user => res.json(user));
  }

  /**
   * Get the userDetails by userId from database
   * @param {*} req
   * @param {*} res
   */
  findAll(req, res) {
    console.log(req.params.id)
    db.user.findAll({where: {id: req.params.id}})
      .then(dbUser => res.json(dbUser));
  }

  /**
   * Update the user
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.user
      .update(req.body, { where: req.params })
      .then(user => res.json(user));
  }

  /**
   * Remove a user in database
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.user.destroy({ where: req.params }).then(user => res.json(user));
  }

  getPosts(req, res) {
    db.post.findAll({
      where: {
        postedBy: req.params.id
      }
    }).then(function(posts){
      res.json(posts);
    })
  }
}

module.exports = UserController;
