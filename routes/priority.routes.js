const express = require('express')
const { createPriority } = require('../controllers/priority.controller')

const router = express.Router()

router.post('/', createPriority)

module.exports = router