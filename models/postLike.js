module.exports = function(sequelize, DataTypes) {
  var postLike = sequelize.define("postLike", {});

  // Creates associates
  postLike.associate = function(models) {
    postLike.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return postLike;
};
