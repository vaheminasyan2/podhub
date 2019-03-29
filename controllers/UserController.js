const db = require(`../models/index.js`);
const axios = require('axios');

/**
 * Class User Controller
 */
class UserController {
  /**
   * Get the isFollowing by userId from database
   * @param {*} req
   * @param {*} res
   */
  findIsFollowing(req, res) {
    console.log(req.params.id);

    db.follow
      .findAll({
        where: { followedBy: req.params.id }
      })
      .then(dbfollow => res.json({ count: dbfollow.length }));

    // db.follow
    //   .findAll({
    //     attributes: [
    //       db.sequelize.fn("COUNT", db.sequelize.col("isFollowing")),
    //       "isFollowing"
    //     ],
    //     where: {
    //       followedBy: req.params.id
    //     }
    //   })
    //   .then(dbfollow => res.json(dbfollow));
  }

  /**
   * Get the isFollowed by userId from database
   * @param {*} req
   * @param {*} res
   */
  findFollowedBy(req, res) {
    console.log(req.params.id);
    db.follow
      .findAll({ where: { isFollowing: req.params.id } })
      .then(dbfollow => res.json({ count: dbfollow.length }));
  }

  /**
   * Get the userDetails by userId from database
   * @param {*} req
   * @param {*} res
   */
  getOrCreate(req, res) {
    var newUser = {};
    axios
      .get("https://oauth2.googleapis.com/tokeninfo?id_token=" + req.query.id_token)
      .then(function(response) {
        newUser = {
          name: response.data.name,
          email: response.data.email,
          googleId: response.data.sub,
          profileImage: response.data.picture
        };

        db.user.findOrCreate({
          where: { googleId: newUser.googleId },
          defaults: {
            name: newUser.name,
            email: newUser.email,
            googleId: newUser.googleId,
            profileImage: newUser.profileImage
          }
        })
        .spread(function(user, created) {
          res.json(user);
        });
      })
      .catch(function(error) {
        console.error(error);
        res.status(400);
      })
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

 /**
   * Get all posts for the user id
   * @param {*} req
   * @param {*} res
   */

  getPosts(req, res) {
    db.post
      .findAll({
        where: {
          postedBy: req.params.id
        }
      })
      .then(function(posts) {
        res.json(posts);
      });
  }

  // Input: UserId
  // Output: Posts (From All The Followed Users)
  getFollowingsPosts(req, res) {
    var promises =[];
    var a = [];
    db.user.findByPk(req.params.id).then(function(user) {
      user.getIsFollowing().then(function(users) {
        users.forEach(user => {
          var newPromise = user.getPosts()
          promises.push(newPromise)
        });

        Promise.all(promises).then(function(posts) {
          res.json(posts.flat().sort(function(a, b) {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            return 0;
          }));
        }).catch(function(error) {
          res.status(400);
        })
      });
    });
  }

 /* 
  reverse_compare(a, b) {
    if (a.updatedAt < b.updatedAt) return 1;
    if (a.updatedAt > b.updatedAt) return -1;
    return 0;
  }
 */ 
}

module.exports = UserController;
