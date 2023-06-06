const express = require('express')
const cors = require('cors')
const router = express.Router();
const { register, login, createSuperUser } = require('../controllers/authcontrollers')

router.post('/register', register)
router.post('/login', login)
router.post('/createsuper', createSuperUser)


module.exports = router;