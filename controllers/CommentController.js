const server = require(`../server.js`);
const db = require(`../models/index.js`);
const Op = db.Sequelize.Op;

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
    db.comment.create(req.body).then(function(comment) {
      db.user.findByPk(req.body.commentedBy).then(function(user) {
        db.post.findByPk(req.body.postId).then(function(post){
          res.json(comment);

          if(post.postedBy != req.body.commentedBy){
            server.notification.notifyComment(post.postedBy ,user.name, req.body.comment, post.episodeName);
            db.notification.create(
              {
                action: "c",
                name: user.name,
                actorImage: user.profileImage,
                actorId: user.id,
                postId: req.body.postId,
                userId: post.postedBy
              }
            )
        }

        })
      });
    });
  }

  /**
   * create likes for comments in database
   * @param {*} req
   * @param {*} res
   */
  createCommentLikes(req, res) {
    db.commentLike.findOrCreate({ where: req.body }).then(function(dbCommentLike){
      db.comment.findByPk(req.body.commentId).then(function(comment){
        db.user.findByPk(req.body.userId).then(function(likedBy){
          res.json(dbCommentLike);

          if(comment.commentedBy != req.body.userId && dbCommentLike[1] === true){
            server.notification.notifyCommentLike(comment.commentedBy, likedBy.name, comment.comment);
            db.notification.create(
              {
                action: "cl",
                name: likedBy.name,
                actorImage: likedBy.profileImage,
                actorId: likedBy.id,
                postId: comment.postId,
                userId: comment.commentedBy
              }
            )
          }

        })
      })
    });
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
   * Get the users Details who liked comments  <----- Home and Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  getUsersLikedComment(req, res) {
    console.log(req.params.id);
    db.commentLike
      .findAll({ where: { commentId: req.params.id } })
      .then(dbCommentLike => {
        let userIds = dbCommentLike.map(like => like.userId);
        console.log(userIds);
        if(userIds.length){
        db.user
          .findAll({
            where: {
              id: {
                [Op.or]: userIds
              }
            }
          })
          .then(dbUser => {
            let userDetails = dbUser.map(user=>{ return {id: user.id, name: user.name, image: user.profileImage}})
            res.json(userDetails);
          });
        }
        else{
          res.json(userIds);
        }
      });
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
    db.commentLike.destroy({ where: req.params }).then(dbCommentLikes => res.json(dbCommentLikes));
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
