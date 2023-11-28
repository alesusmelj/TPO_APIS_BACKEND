const express = require("express");
const ClassController = require("../controllers/class.controller.js");
const router = express.Router();
const usersRouter = require("./api/user.route");
const classRouter = require("./api/class.route");
const notificationRouter = require("./api/notification.route.js");
const contratacionRouter = require("./api/contratacion.route.js");

router.use("/users", usersRouter);
router.use("/class", classRouter);
router.use("/notifications", notificationRouter);
router.get("/classes/:category", ClassController.getClassesByCategory);
router.use("/contrataciones", contratacionRouter);

module.exports = router;
