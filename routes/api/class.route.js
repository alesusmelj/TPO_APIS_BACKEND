const express = require('express')
const ClassController = require('../../controllers/classes.controller.js');
const router = express.Router()

router.post("/create", ClassController.createClass)
router.delete("/delete/:id", ClassController.deleteClass)

module.exports = router