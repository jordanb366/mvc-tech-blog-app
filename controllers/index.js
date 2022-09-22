// Requires router
const router = require("express").Router();
// Routes
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// Uses routes required
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
