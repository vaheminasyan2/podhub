module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
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
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  // Creates associates
  post.associate = function(models) {
    post.hasMany(models.comment, {
      onDelete: "cascade"
    });

    post.hasMany(models.postLike, {
      onDelete: "cascade"
    });
  };

  return post;
};
