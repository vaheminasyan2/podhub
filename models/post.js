module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageIcon: {
      type: DataTypes.BLOB
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  // Creates associates
  post.associate = function(models) {
    post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  post.associate = function(models) {
    post.hasMany(models.comment, {
      onDelete: "cascade"
    });
  };

  return post;
};
