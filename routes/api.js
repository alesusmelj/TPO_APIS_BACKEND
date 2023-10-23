const express = require("express");
const ClassController = require("../controllers/class.controller.js");
const router = express.Router();
const usersRouter = require("./api/user.route");
const classRouter = require("./api/class.route");

router.use("/users", usersRouter);
router.use("/class", classRouter);
router.get("/classes/:category", ClassController.getClassesByCategory);

module.exports = router;
