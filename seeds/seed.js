// Seeds imports and requires
const sequelize = require("../config/connection");
const { User, Posts, Comments } = require("../models");
// Seeded data required
const userData = require("./userData.json");
const postsData = require("./postsData.json");
const commentsData = require("./commentsData.json");
// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // seeds users
  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // await Posts.bulkCreate(postsData);
  // seed posts
  for (const posts of postsData) {
    await Posts.create({
      ...posts,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }
  const posts = await Posts.bulkCreate(postsData, {});
  // seeds comments
  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
