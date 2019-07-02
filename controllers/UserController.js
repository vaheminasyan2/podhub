const server = require(`../server.js`);
const db = require(`../models/index.js`);
const axios = require('axios');
const Op = db.Sequelize.Op;

/**
 * Class User Controller
 */
class UserController {
  /**
   * Get all existing users except current logged in user <----- user Search Page ----->
   * @param {*} req
   * @param {*} res
   */
  getUsersList(req, res){
    db.user.findAll({
      order: [
        ['name', 'ASC'],
      ],
    }).then(function(users){
      for( var i = 0; i < users.length; i++){ 
        if ( users[i].id == req.params.id) {
          users.splice(i, 1); 
        }
     }
     res.json(users);
    })
  }

  /**
   * Post new following in database <----- user Search Page ----->
   * @param {*} req
   * @param {*} res
   */
  postFollowUser(req, res){
    db.follow.create(req.body).then(function(follow){
      db.user.findByPk(req.body.followedBy).then(function(by){
        db.notification.create(
          {
            action: "f",
            name: by.name,
            actorImage: by.profileImage,
            actorId: by.id,
            userId: req.body.isFollowing
          }
        ).then(function(notification){
          server.notification.notifyfavorite(req.body.isFollowing, by.name);
          res.json(follow);
        })
      })
    });
  }

  /**
   * Remove following in database <----- user Search Page ----->
   * @param {*} req
   * @param {*} res
   */
  unFollow(req, res){
    console.log(req.body);
    db.follow.destroy({ 
      where: req.body
    }).then(following => res.json(following));
  }


  /**
   * Get the isFollowing by userId from database <----- user Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  findIsFollowing(req, res) {
    console.log(req.params.id);

    db.follow
      .findAll({
        where: { followedBy: req.params.id }
      })
      .then(dbfollow => res.json([{ count: dbfollow.length }]));
  }

  /**
   * Get the isFollowed by userId from database <----- user Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  findFollowedBy(req, res) {
    console.log(req.params.id);
    db.follow
      .findAll({ where: { isFollowing: req.params.id } })
      .then(dbfollow => res.json([{ count: dbfollow.length }]));
  }


  /**
   * Get the isFollowing users details by userId from database <----- user Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  findIsFollowingUser(req, res) {
    console.log(req.params.id);

    db.follow
      .findAll({
        where: { followedBy: req.params.id }
      })
      .then(dbfollows => {
        let userIds = dbfollows.map(dbfollow => dbfollow.isFollowing)
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
              let userDetails = dbUser.map(user=>{ return {id: user.id, name: user.name, image: user.awsImageUrl || user.profileImage}})
              res.json(userDetails);
            });
          }
          else{
            res.json(userIds);
          }
      });
  }

  /**
   * Get the isFollowed users details by userId from database <----- user Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  findFollowedByUser(req, res) {
    console.log(req.params.id);
    db.follow
      .findAll({
        where: { isFollowing: req.params.id }
      })
      .then(dbfollows => {
        let userIds = dbfollows.map(dbfollow => dbfollow.followedBy)
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
              let userDetails = dbUser.map(user=>{ return {id: user.id, name: user.name, image: user.awsImageUrl || user.profileImage}})
              res.json(userDetails);
            });
          }
          else{
            res.json(userIds);
          }
      });
  }

  /**
   * Get followings by user <----- user Search Page ----->
   * @param {*} req
   * @param {*} res
   */
  findFollowings(req, res){
    db.user.findByPk(req.params.id).then(function(user) {
      user.getFollowedBy().then(function(users){
        res.json(users)
      });
    })
  }

  /**
   * Get the userDetails by userId from database <----- Login to Home Page ----->
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
      });
  }

  getUser(req, res) {
    db.user.findAll({
      where: {
        id: req.params.id,
      }
    })
    .then(function(user) {   
      res.json(user);
    });
  }

  getProfileHeader(req, res) {
    db.user.findAll({ 
      where: { 
        id: req.params.googleId 
      }
    })
    .spread(function(profileHeader, created) {
      res.json(profileHeader);
    });
  }

  /**
   * Update the user
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.user
      .update(req.body, { where: { id: req.params.id }   
      })
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
    var postPromises =[];
    var postId2Likes = {};
    var postId2Comments = {};
    var postId2UserNames = {};
    var postId2UserImages = {};
    var postId2awsImagesUrl = {};
    db.user.findByPk(req.params.id).then(function(user) {
      postPromises.push(user.getPosts());
      user.getFollowedBy().then(function(users) {
        users.forEach(user => {
          const newPromise = user.getPosts();
          postPromises.push(newPromise);
        });
       

        Promise.all(postPromises).then(function(posts) {
          const flattenedPosts = [].concat.apply([], posts);
          const sortedPosts = flattenedPosts.sort(function(a, b) {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            return 0;
          });

          // Likes
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
              console.log(user)
              postId2UserNames[post.id] = user.name;
              if(!user.awsImageUrl){
                postId2UserImages[post.id] = user.profileImage;
              }
              else{
                postId2UserImages[post.id] = user.awsImageUrl;
              }
            })
          });

          Promise.all(likeCommPromises).then(function() {
            sortedPosts.forEach(post => {
              post.numberOfLikes = postId2Likes[post.id];
              post.numberOfComments = postId2Comments[post.id];
              post.userName = postId2UserNames[post.id];
              post.userImage = postId2UserImages[post.id];
            });
            console.log("****usercontroller****")
            console.log(sortedPosts)
            res.json(sortedPosts);
          })
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

 getNotifications(req, res)
 {
   db.notification.findAll({
    offset: 0, limit: 30,
     where: {
      userId: req.params.id
     },
     order: [
      ['createdAt', 'DESC']
    ]
   }).then(function(nots){
     res.json(nots)
   })

 }

  isNewNotification(req, res)
  {
    db.user.findByPk(req.params.id).then(function(user){
      db.notification.findAndCountAll({
        where: {
          $and: [
            {userId: user.id}, 
            {createdAt: {
              [Op.gte]: user.notificationsSeen}
            }
          ]          
        }
      }).then(function(latest){
        res.json(latest.count);
      })
    })
  }
}


module.exports = UserController;