const express = require('express')

const router = express.Router()
const usersRouter = require('./api/user.route')
const classesRouter = require('./api/class.route')



router.use('/users', usersRouter);
router.use('/clases', classesRouter);

module.exports = router;
