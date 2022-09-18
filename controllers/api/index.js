// index js api routes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
// blog posts routes will go here ?

router.use("/users", userRoutes);

module.exports = router;
