const db = require(`../models/index.js`);

/**
 * Class Favorite Controller
 */
class FavoriteController {
  /**
   * create a new favorite podcast in database
   * @param {*} req
   * @param {*} res
   */
  create(req, res) {
    db.favorite
      .findOrCreate({
        where: {
          episodeId: req.body.episodeId,
          userId: req.body.userId
        },
        defaults: {
          podcastId: req.body.podcastId,
          podcastName: req.body.podcastName,
          podcastLogo: req.body.podcastLogo,
          episodeId: req.body.episodeId,
          episodeName: req.body.episodeName,
          date: req.body.date,
          description: req.body.description,
          audioLink: req.body.audioLink,
          userId: req.body.userId
        }
      })
      .then(function(favorite, created) {
          res.json(favorite);
      })
      .catch(function(error) {
        console.error(error);
        res.status(400);
      });
  }

  /**
   * Get the favorite podcast by userId from database
   * @param {*} req
   * @param {*} res
   */
  findAll(req, res) {
    console.log(req.params.id)
    db.favorite.findAll({where: {userId: req.params.id}})
      .then(dbfavorite => {
        const sortedFavorite = dbfavorite.sort(function(a, b) {
          if (a.updatedAt < b.updatedAt) return 1;
          if (a.updatedAt > b.updatedAt) return -1;
          return 0;
        });
        res.json(sortedFavorite)
      });
  }

  /**
   * Update the favorite podcast in database
   * @param {*} req
   * @param {*} res
   */
  update(req, res) {
    db.favorite
      .update(req.body, { where: req.params })
      .then(favorite => res.json(favorite));
  }

  /**
   * Remove a favorite podcast in database <----- User Profile Page ----->
   * @param {*} req
   * @param {*} res
   */
  remove(req, res) {
    db.favorite
      .destroy({ where: req.params })
      .then(favorite => res.json(favorite));
  }
}

module.exports = FavoriteController;
