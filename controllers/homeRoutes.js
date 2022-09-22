const router = require("express").Router();
const { Posts, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

// Home route
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postsData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postsData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// posts with param route
router.get("/posts/:id", async (req, res) => {
  try {
    // Gets posts by the param id
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serializes posts so template can read
    const posts = postsData.get({ plain: true });
    console.log(posts);

    // Gets comments data
    const commentsData = await Comments.findAll({
      include: {
        model: Posts,
        attributes: ["id"],
      },
      // Only where post_id is the post id associated with comment
      where: {
        post_id: req.params.id,
      },
    });
    // Serialize data
    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );

    console.log(comments);
    // Render post data
    res.render("post", {
      ...posts,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Dashboard route
// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });
    // Serialize user data
    const user = userData.get({ plain: true });
    console.log(user);
    // Render dashboar and data
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Takes to edit posts on dashboard
router.get("/dashboard/posts/:id", withAuth, async (req, res) => {
  try {
    // Gets posts by id params
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serializes posts data
    const posts = postsData.get({ plain: true });
    console.log(posts);
    // Renders all data
    res.render("editpost", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// new posts routes
// Use withAuth middleware to prevent access to route
router.get("/newpost", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });
    // Serialize user data
    const user = userData.get({ plain: true });
    console.log(user);
    // Render user data
    res.render("newpost", {
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
