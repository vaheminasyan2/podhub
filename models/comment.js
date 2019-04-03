module.exports = function(sequelize, DataTypes) {
    var comment = sequelize.define("comment", {
        comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    // Creates associates
    comment.associate = function(models) {
      comment.hasMany(models.commentLike, {
        onDelete: "cascade"
      });

      comment.belongsTo(models.user, {
        foreignKey: {
            name: 'commentedBy',
            allowNull: false
          }
      });
    };
  
    return comment;
  };
  