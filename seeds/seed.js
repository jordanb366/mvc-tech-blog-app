// Seeds index will go here
const sequelize = require("../config/connection");
const { User, Posts, Comments } = require("../models");

const userData = require("./userData.json");
const postsData = require("./postsData.json");
const commentsData = require("./commentsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // await Posts.bulkCreate(postsData);

  for (const posts of postsData) {
    await Posts.create({
      ...posts,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }
  const posts = await Posts.bulkCreate(postsData, {});

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
