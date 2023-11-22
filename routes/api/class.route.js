const express = require("express");
const ClassController = require("../../controllers/class.controller.js");
const { isTheSameUser, authorization } = require("../../auth/middlewares.js");

const router = express.Router();

router.post("/create", authorization, ClassController.createClass);
router.delete("/:id", authorization, ClassController.deleteClass);
router.put("/:id", authorization, ClassController.updateClass);
router.put("/activate/:id", authorization, ClassController.activateClass);
router.get("/:id", ClassController.getClass);
router.post("/contact/:id", isTheSameUser, ClassController.contactUser);
router.post("/comment/:id", isTheSameUser, ClassController.createComment);

module.exports = router;
