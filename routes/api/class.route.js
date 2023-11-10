const express = require("express");
const ClassController = require("../../controllers/class.controller.js");
const authorization = require("../../auth/auth.js");
const router = express.Router();

router.post("/create", authorization, ClassController.createClass);
router.delete("/delete/:id", authorization, ClassController.deleteClass);
router.put("/update/:id", authorization, ClassController.updateClass);
router.put("/activate/:id", authorization, ClassController.activateClass);
router.get("/:id", ClassController.getClass);
router.post("/contact/:id", ClassController.contactUser);
router.post("/comment/:id", ClassController.createComment);

module.exports = router;
