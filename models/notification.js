module.exports = function(sequelize, DataTypes) {
    var notification = sequelize.define("notification", { 
      action: {
        type: DataTypes.STRING(2000),
        allowNull: false
      },
  
      name: {
        type: DataTypes.STRING(2000),
        allowNull: false
      }, 
      
      actorId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },

      actorImage: {
        type: DataTypes.STRING
      }
    });
  
    return notification;
  };