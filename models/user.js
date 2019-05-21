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
    },
    aboutMe: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    notificationsSeen: {
      type: DataTypes.DATE
    }
    
  });

  // Creates associates
  user.associate = function(models) {

    user.belongsToMany(user, {as: 'FollowedBy', foreignKey: 'followedBy', through: 'follow' });
    user.belongsToMany(user, {as: 'IsFollowing', foreignKey: 'isFollowing', through: 'follow' });

    user.hasMany(models.post, {
      onDelete: "cascade",
      foreignKey: "postedBy"
    });

    user.hasMany(models.favorite, {
      onDelete: "cascade"
    });

    user.hasMany(models.notification, {
      onDelete: "cascade"
    })
  };

  return user;
};
