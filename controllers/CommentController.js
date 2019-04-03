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
   * create likes for comments in database
   * @param {*} req
   * @param {*} res
   */
  createCommentLikes(req, res) {
    db.commentLike.findOrCreate({ where: req.body }).then(commentLike => res.json(commentLike));
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
    db.comment.destroy({ where: req.params }).then(dbcomment => res.json(dbcomment));
  }

  /**
   * Remove a comment likes in database
   * @param {*} req
   * @param {*} res
   */
  removeCommentLikes(req, res) {
    db.commentLike.destroy({ where: req.params }).then(dbcommentLikes => res.json(dbcommentLikes));
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
