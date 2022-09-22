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
  // const postsData = await Comments.findAll({
  //   include: [{ model: Posts }],
  //   where: {},
  // });
  // // Serialize data so the template can read it
  // const posts = postsData.map((post) => post.get({ plain: true }));
  // console.log(posts);
});

// posts with param route
router.get("/posts/:id", async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postsData.get({ plain: true });
    console.log(posts);

    const commentsData = await Comments.findAll({
      include: {
        model: Posts,
        attributes: ["id"],
      },

      where: {
        post_id: req.params.id,
      },
    });

    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );
    // const comments = commentsData.get({ plain: true });
    console.log(comments);

    res.render("post", {
      ...posts,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/test", async (req, res) => {
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
    res.render("post", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Takes to edit posts
router.get("/dashboard/posts/:id", withAuth, async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postsData.get({ plain: true });
    console.log(posts);

    res.render("editpost", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/newpost", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
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
