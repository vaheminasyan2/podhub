module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    
    podcastId: {
      type: DataTypes.STRING(500),
      allownull: false
    },

    podcastName: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    podcastLogo: {
      type: DataTypes.STRING(2000)
    },

    episodeId: {
      type: DataTypes.STRING(500),
      allowNull: false
    },

    episodeName: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    date: {
      type: DataTypes.DATE
    },

    audioLink: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      len: [1]
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  });

  return favorite;
};
