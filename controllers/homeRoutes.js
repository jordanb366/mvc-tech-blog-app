const router = require("express").Router();
// const { Posts, User } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  //   try {
  //     const blogPostData = await Posts.findAll({
  //       include: [
  //         {
  //           model: User,
  //           attributes: ['name'],
  //         },
  //       ],
  //     });
  //     // Serializes the data so template can read properly
  //     const posts = blogPostData.map((project) => posts.get({ plain: true }));
  //     // Pass serialized data and session flag into template
  //     res.render('homepage', {
  //       posts,
  //       logged_in: req.session.logged_in
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
});

router.get("/posts/:id", async (req, res) => {
  //   try {
  //     const projectData = await Posts.findByPk(req.params.id, {
  //       include: [
  //         {
  //           model: User,
  //           attributes: ["name"],
  //         },
  //       ],
  //     });
  //     const posts = blogPostData.get({ plain: true });
  //     res.render("posts, {
  //       ...posts,
  //       logged_in: req.session.logged_in,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
});

// Uses withAuth middleware that will prevent access
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Project }],
//     });
//     const user = userData.get({ plain: true });
//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  //   if (req.session.logged_in) {
  //     res.redirect("/profile");
  //     return;
  //   }
  //   res.render("login");
});

module.exports = router;
