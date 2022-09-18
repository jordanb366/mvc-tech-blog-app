// index models will go here
const User = require("./User");
// posts for blog may go here once logins are working

// commenting out for now until login is tested
// User.hasMany({
//   //  Need some type of foreign key for blog posts
// });

// blog post will belong to users most likely

module.exports = { User };
