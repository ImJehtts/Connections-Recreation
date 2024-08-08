const express = require('express')
const gameRoutes = require('./game')
const wbRoutes = require('./word_bank')

const router = express.Router()

router.use('/game', gameRoutes)
router.use('/wb', wbRoutes)

module.exports = router