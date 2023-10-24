const express = require("express");
const authorization = require("../../auth/auth.js");
const NotificationsController = require("../../controllers/notifications.controller.js");
const router = express.Router();

router.get("/", authorization, NotificationsController.getNotifications)
router.put("/:id", authorization, NotificationsController.changeNotificationSeen)
module.exports = router