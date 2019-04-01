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
   * Get the posts by userId from database
   * @param {*} req
   * @param {*} res
   */
  getPostByUser(req, res) {
    console.log(req.params.id)
    db.post.findAll({where: {postedBy: req.params.id}})
      .then(dbPost => {
        const sortedPosts = dbPost.sort(function(a, b) {
          if (a.updatedAt < b.updatedAt) return 1;
          if (a.updatedAt > b.updatedAt) return -1;
          return 0;
        });
        res.json(sortedPosts)
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

  ///// get Post comments
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

  ///// get Post likes
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
