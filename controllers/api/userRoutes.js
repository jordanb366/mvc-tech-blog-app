const router = require("express").Router();
const { User } = require("../../models");
// User model

// Posts route to create a new user
router.post("/", async (req, res) => {
  try {
    // Creates user with req.body info, and create according the the user model
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // Gets user by email
    const userData = await User.findOne({ where: { email: req.body.email } });
    // Checks if valid
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Gets password
    const validPassword = await userData.checkPassword(req.body.password);
    // Checks if valid
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Will save user to data according to the user model
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.name;
      console.log(req.session);
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  // Check if logged in or not
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
