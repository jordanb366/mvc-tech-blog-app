const router = require("express").Router();
const { Posts } = require("../../models");
const withAuth = require("../../utils/auth");

// Creates post
router.post("/", withAuth, async (req, res) => {
  // Loggs user into the console
  console.log("logged in user ", req.session.user_name);

  try {
    // Creates posts with user id associated according to post model
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // Success else will display error
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Delete post by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Will delete data where id and user_id associated with post
    const postsData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // Checks if post data is valid
    if (!postsData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    // Success response or else will display error
    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update post route
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Updates posts for id and user_id
    const postsData = await Posts.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // Checks if post id is valid
    if (!postsData) {
      res.status(404).json({ message: "No posts found with this id!" });
      return;
    }
    // Will display success message if updated successfully else will display error message
    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
