const express = require('express')
const UserController = require('../../controllers/users.controller.js');
const authorization = require('../../auth/auth.js');
const router = express.Router()

router.post("/login", UserController.loginUser)
router.post("/register", UserController.createUser)
router.put("/update", authorization, UserController.updateUser)
module.exports = router