// Seeds index will go here
const sequelize = require("../config/connection");
const { User, Posts } = require("../models");

const userData = require("./userData.json");
const postsData = require("./postsData.json");

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

  process.exit(0);
};

seedDatabase();
