const router = require("express").Router();
// const { Posts, User } = require("../models");
// const withAuth = require("../utils/auth");

// Home route
router.get("/", async (req, res) => {
  res.render("homepage");
});

// posts with param route
router.get("/posts/:id", async (req, res) => {});

// login route on home page
router.get("/login", (req, res) => {});

module.exports = router;
