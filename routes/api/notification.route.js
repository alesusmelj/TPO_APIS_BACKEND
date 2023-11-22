const express = require("express");
const NotificationsController = require("../../controllers/notifications.controller.js");
const { authorization } = require("../../auth/middlewares.js");
const router = express.Router();

router.get("/", authorization, NotificationsController.getNotifications)
router.put("/changeSeen/:id", authorization, NotificationsController.changeNotificationSeen)
router.put("/changeState/:id", authorization, NotificationsController.changeNotificationState)
module.exports = router