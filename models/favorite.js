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
            type: DataTypes.STRING
        },
        details: {
          type: DataTypes.TEXT,
          allowNull: false
        }
    });
    
    return favorite;
  };
  