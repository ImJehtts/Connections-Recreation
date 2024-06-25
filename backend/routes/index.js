const express = require('express')
const gameRoutes = require('./game')
const wbRoutes = require('./word_bank')
const statsRoutes = require('./stats')

const router = express.Router()

router.use('/game', gameRoutes)
router.use('/wb', wbRoutes)
router.use('/stats', statsRoutes)

module.exports = router