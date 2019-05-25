const server = require(`../server.js`);
const db = require(`../models/index.js`);
const Op = db.Sequelize.Op;

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
    console.log("posts", req.body);
    db.post.create(req.body).then(function(post) {
      res.json(post);
      server.notification.notifyShare(req.body.postedBy, req.body.podcastId);
    });
  }

  // /**
  //  * Get the posts by userId from database
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // findAll(req, res) {
  //   console.log(req.params.id)
  //   db.post.findAll({where: {postedBy: req.params.id}})
  //     .then(dbPost => res.json(dbPost));
  // }

  /**
   * create the likes for the posts by userId, postId from database <----- Home Page  and User Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  createLikes(req, res) {
    db.postLike.findOrCreate({where: req.body}).then(function(dbPostLike){
      db.post.findByPk(req.body.postId).then(function(post){
        db.user.findByPk(req.body.userId).then(function(likedBy){
          res.json(dbPostLike);
          
          if(post.postedBy != req.body.userId && dbPostLike[1] === true) {
            server.notification.notifyPostLike(post.postedBy, likedBy.name, post.episodeName);
            db.notification.create(
              {
                action: "pl",
                name: likedBy.name,
                actorImage: likedBy.profileImage,
                actorId: likedBy.id,
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
   * Remove likes for the posts <----- Home page and User Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  removeLikes(req, res) {
    db.postLike
      .destroy({ where: req.params })
      .then(dbPostLike => res.json(dbPostLike));
  }

  /**
   * Get the posts by userId from database <----- User Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  getPostByUser(req, res) {
    console.log(req.params.id);
    var postPromises = [];
    var postId2Likes = {};
    var postId2Comments = {};
    var postId2UserNames = {};
    var postId2UserImages = {};
    db.post.findAll({ where: { postedBy: req.params.id } }).then(dbPost => {
      const sortedPosts = dbPost.sort(function(a, b) {
        if (a.updatedAt < b.updatedAt) return 1;
        if (a.updatedAt > b.updatedAt) return -1;
        return 0;
      });
      postPromises.push(...sortedPosts);
      var likeCommPromises = [];
      sortedPosts.forEach(post => {
        const likePromise = post.getPostLikes();
        const commentPromise = post.getComments();
        const userPromise = db.user.findByPk(post.postedBy);
        likeCommPromises.push(likePromise);
        likeCommPromises.push(commentPromise);
        likeCommPromises.push(userPromise);

        likePromise.then(function(likes) {
          postId2Likes[post.id] = likes.length;
        });
        commentPromise.then(function(comments) {
          postId2Comments[post.id] = comments.length;
        });
        userPromise.then(function(user) {
          postId2UserNames[post.id] = user.name;
          postId2UserImages[post.id] = user.profileImage;
        });
      });

      Promise.all(likeCommPromises)
        .then(function() {
          sortedPosts.forEach(post => {
            post.numberOfLikes = postId2Likes[post.id];
            post.numberOfComments = postId2Comments[post.id];
            post.userName = postId2UserNames[post.id];
            post.userImage = postId2UserImages[post.id];
          });
          res.json(postPromises);
        })
        .catch(function(error) {
          res.status(400);
        });
    });
  }

  /**
   * Get the users Details who liked post from database <----- Home and Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  getUsersLikedPost(req, res) {
    console.log(req.params.id);
    db.postLike
      .findAll({ where: { postId: req.params.id } })
      .then(dbPostLike => {
        let userIds = dbPostLike.map(like => like.userId);
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
   * Update the post in database
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.post
      .update(req.body, { where: { id: req.params.id }   
      })
      .then(post => res.json(post));
  }

  /**
   * Remove a Post in database <----- User Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.post.destroy({ where: req.params }).then(post => res.json(post));
  }

  /**
   * Get Post comments from database <----- User Profile Page, Home Page ----->
   * @param {*} req
   * @param {*} res
   */
  getPostComments(req, res) {
    console.log(req.params);
    db.comment
      .findAll({
        where: {
          postId: req.params.id
        }
      })
      .then(function(comments) {
        res.json(comments);
      });
  }

  /**
   * Get Post likes from database <----- User Profile Page, Home Page ----->
   * @param {*} req
   * @param {*} res
   */
  getPostLikes(req, res) {
    db.postLike
      .findAll({
        where: {
          postId: req.params.id
        }
      })
      .then(function(postLikest) {
        res.json(postLikest);
      });
  }
}

module.exports = PostController;
