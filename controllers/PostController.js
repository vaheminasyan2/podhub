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

    console.log("posts",req.body);
    db.post.create(req.body).then(post => res.json(post));
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
   * Get the posts by userId from database <----- User Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  getPostByUser(req, res) {
    console.log(req.params.id)
    var postPromises =[];
    var postId2Likes = {};
    var postId2Comments = {};
    var postId2UserNames = {};
    var postId2UserImages = {};
    db.post.findAll({where: {postedBy: req.params.id}})
      .then(dbPost => {
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
          const userPromise = db.user.findByPk(post.postedBy)
          likeCommPromises.push(likePromise);
          likeCommPromises.push(commentPromise);
          likeCommPromises.push(userPromise);

          likePromise.then(function(likes) {
            postId2Likes[post.id] = likes.length;
          });
          commentPromise.then(function(comments) {
            postId2Comments[post.id] = comments.length;
          });
          userPromise.then(function(user){
            postId2UserNames[post.id] = user.name;
            postId2UserImages[post.id] = user.profileImage;
          })
        });

        Promise.all(likeCommPromises).then(function() {
          sortedPosts.forEach(post => {
            post.numberOfLikes = postId2Likes[post.id];
            post.numberOfComments = postId2Comments[post.id];
            post.userName = postId2UserNames[post.id];
            post.userImage = postId2UserImages[post.id];
          });
        res.json(postPromises)
    }).catch(function(error) {
      res.status(400);
    })
      });
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
  getPostComments(req, res){
    console.log(req.params)
    db.comment.findAll({
      where:
      {
        postId: req.params.id
      }
    }).then(function(comments){
      res.json(comments);
    })
  }

  /**
   * Get Post likes from database <----- User Profile Page, Home Page ----->
   * @param {*} req
   * @param {*} res
   */
  getPostLikes(req, res){
    db.postLike.findAll({
      where:
      {
        postId: req.params.id
      }
    }).then(function(postLikest){
      res.json(postLikest);
    })
  }

  

}

module.exports = PostController;
