// index js api routes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postsRoutes = require("./postsRoutes");
// blog posts routes

router.use("/users", userRoutes);
router.use("/posts", postsRoutes);

module.exports = router;
