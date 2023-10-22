const express = require('express')
const { signUpUser, loginUser } = require('../controllers/user.controllers')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'Get All users'})
})

router.post('/', signUpUser)
router.post('/login', loginUser)

module.exports = router