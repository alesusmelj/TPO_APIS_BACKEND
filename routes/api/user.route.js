const express = require("express");
const UserController = require("../../controllers/users.controller.js");
const authorization = require("../../auth/auth.js");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", UserController.loginUser);
router.post("/register", UserController.createUser);
router.put(
  "/update",
  upload.single("imagen"),
  authorization,
  UserController.updateUser
);
router.get("/isLogged", UserController.isLogged);
module.exports = router;
