const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");

// Home route
router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});

// posts with param route
router.get("/posts/:id", async (req, res) => {});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route on home page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
