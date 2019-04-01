module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    podcastName: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    podcastLogo: {
      type: DataTypes.STRING(2000)
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
