const express = require('express')
const UserController = require('../../controllers/users.controller.js');
const router = express.Router()

router.post("/login", UserController.loginUser)
router.post("/register", UserController.createUser)
router.post("/update", UserController.updateUser)
module.exports = router