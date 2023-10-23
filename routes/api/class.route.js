const express = require("express");
const ClassController = require("../../controllers/class.controller.js");
const authorization = require("../../auth/auth.js");
const router = express.Router();

router.post("/create", authorization, ClassController.createClass);
router.delete("/delete/:id", authorization, ClassController.deleteClass);
router.put("/update/:id", authorization, ClassController.updateClass);
router.put("/activate/:id", authorization, ClassController.activateClass);

module.exports = router;
