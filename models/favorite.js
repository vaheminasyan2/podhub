module.exports = function(sequelize, DataTypes) {
    var favorite = sequelize.define("favorite", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
          },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        imageIcon: {
            type: DataTypes.BLOB
        },
        details: {
          type: DataTypes.TEXT,
          allowNull: false
        }
    });
  
    // Creates associates
    favorite.associate = function(models) {
      favorite.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    
    return favorite;
  };
  