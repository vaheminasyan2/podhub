module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  // Creates associates
  user.associate = function(models) {

    user.belongsToMany(user, {as: 'children', foreignKey: 'isFollowing', through: 'follow' });
    user.belongsToMany(user, {as: 'parents', foreignKey: 'followedBy', through: 'follow' });

  
    user.hasMany(models.post, {
      onDelete: "cascade"
    });
    user.hasMany(models.postLike, {
      onDelete: "cascade"
    });
  };

  return user;
};
