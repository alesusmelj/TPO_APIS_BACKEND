const express = require("express");

const router = express.Router();
const usersRouter = require("./api/user.route");
const classRouter = require("./api/class.route");

router.use("/users", usersRouter);
router.use("/class", classRouter);

module.exports = router;
