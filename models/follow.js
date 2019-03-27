module.exports = function(sequelize, DataTypes) {

  var follow = sequelize.define("follow", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    //   status: DataTypes.STRING
  });

  return follow;
};
