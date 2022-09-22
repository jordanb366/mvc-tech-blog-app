// Require all models
const User = require("./User");
const Posts = require("./Posts");
const Comments = require("./Comments");
// User has many posts
User.hasMany(Posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// Posts belong to User
Posts.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// Comments belong to Posts
Comments.belongsTo(Posts, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
module.exports = { User, Posts, Comments };
