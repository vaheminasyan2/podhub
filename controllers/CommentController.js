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
   * get users who commented post and the post likes.
   * @param {*} req
   * @param {*} res
   */
  getCommentedUser(req, res){
    var postPromises =[];
    var commentLikes = {};
    var commentuserName = {};
    var commentuserImage = {};
    db.post.findByPk(
      req.params.id 
  ).then(function(dbUser){
      dbUser.getComments().then(function (comments) {
        const sortedComments = comments.sort(function(a, b) {
          if (a.updatedAt < b.updatedAt) return -1;
          if (a.updatedAt > b.updatedAt) return 1;
          return 0;
        });
        sortedComments.forEach(comment => {
          const userDetailsPromise = db.user.findByPk(comment.commentedBy);
          const commentLikePromise = comment.getCommentLikes();
          postPromises.push(userDetailsPromise);
          postPromises.push(commentLikePromise);
          
          userDetailsPromise.then(function(user){
            commentuserName[comment.id] = user.name;
            commentuserImage[comment.id] = user.profileImage;
          })
          commentLikePromise.then(function(likes) {
            commentLikes[comment.id] = likes.length;
          });
        });

        Promise.all(postPromises).then(function() {
          sortedComments.forEach(comment => {
            comment.dataValues.numberOfLikes = commentLikes[comment.id];
            comment.dataValues.userName = commentuserName[comment.id];
            comment.dataValues.userImage = commentuserImage[comment.id];
          });
          console.log(sortedComments)
          res.json(sortedComments);
        })
      }).catch(function(error) {
        res.status(400);
      })

    })
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
