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

  getPostComments(req, res){
    db.comment.findAll({
      where:
      {
        postId: req.params.id
      }
    }).then(function(comments){
      res.json(comments);
    })
  }

  getPostLikes(req, res){
    db.post.findAll({
      where:
      {
        postId: req.body.id
      }
    }).then(function(comments){
      res.json(comments);
    })
  }

  getCommentLikes(req, res){
    db.post.findAll({
      where:
      {
        postId: req.body.commentid
      }
    }).then(function(comments){
      res.json(comments);
    })
  }

}

module.exports = PostController;
