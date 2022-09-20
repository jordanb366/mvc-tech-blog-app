// index js api routes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postsRoutes = require("./postsRoutes");
const commentsRoutes = require("./commentsRoutes");
// blog posts routes

router.use("/users", userRoutes);
router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
