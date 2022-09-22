const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");
// Creates comment
router.post("/", withAuth, async (req, res) => {
  // Logs to console logged in user
  console.log("logged in user ", req.session.user_name);

  try {
    // Creates new comment and adds user name
    const newComments = await Comments.create({
      ...req.body,
      // post_id: req.session.post_id,
      username: req.session.user_name,
    });
    // Successs message if create comment else will display error
    res.status(200).json(newComments);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
