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
  createComment(req, res) {
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
  removeComment(req, res) {
    db.comment.destroy({ where: req.params }).then(comment => res.json(comment));
  }

  /**
   * get comment likes
   * @param {*} req
   * @param {*} res
   */
  getCommentLikes(req, res){
    db.commentLike.findAll({
      where:
      {
        commentId: req.params.id
      }
    }).then(function(commentLikes){
      res.json(commentLikes);
    })
  }
}

module.exports = CommentController;
