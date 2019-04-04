module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {

    podcastId: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    podcastName: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    podcastLogo: {
      type: DataTypes.STRING(2000)
    },

    episodeId: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    episodeName: {
      type: DataTypes.STRING(2000)
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    audioLink: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      len: [1]
    },

    userMessage: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    numberOfLikes: sequelize.Sequelize.VIRTUAL,
    numberOfComments: sequelize.Sequelize.VIRTUAL,
    userName: sequelize.Sequelize.VIRTUAL,
    userImage: sequelize.Sequelize.VIRTUAL

  });

  // Creates associates
  post.associate = function(models) {
    post.hasMany(models.comment, {
      onDelete: "cascade"
    });

    post.hasMany(models.postLike, {
      onDelete: "cascade"
    });
  };

  return post;
};