module.exports = function(sequelize, DataTypes) {
  var commentLike = sequelize.define("commentLike", {});

  // Creates associates
  commentLike.associate = function(models) {
    commentLike.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return commentLike;
}
