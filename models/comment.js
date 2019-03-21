module.exports = function(sequelize, DataTypes) {
    var comment = sequelize.define("comment", {
        comment: {
        type: DataTypes.TEXT,
        allowNull: false
      },
        likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });
  
    // Creates associates
    comment.associate = function(models) {
      comment.belongsTo(models.post, {
        foreignKey: {
          allowNull: false
        }
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
  