const express = require("express");
const UserController = require("../../controllers/users.controller.js");
const router = express.Router();
const multer = require("multer");
const { authorization } = require("../../auth/middlewares.js");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", UserController.loginUser);
router.post("/register", UserController.createUser);
router.put(
  "/update",
  upload.single("img"),
  authorization,
  UserController.updateUser
);
router.get("/isLogged", UserController.isLogged);
router.get("", UserController.getUser)

module.exports = router;
