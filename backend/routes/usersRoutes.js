const express = require('express')
const router = express.Router()

const { registerUser, loginUser, ownerData } = require('../controllers/usersControllers')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/data', ownerData)

module.exports = router