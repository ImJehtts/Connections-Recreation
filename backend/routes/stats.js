const express = require('express')
const {
    getStats,
    getStats_byusername,
    createUser,
    updateStats
} = require('../controllers/statscontroller')

const router = express.Router()


router.get('/', getStats)

//Will use this later if i create accounts. Place holder for now 
router.get('/:username', getStats_byusername)

//create new user
router.post('/', createUser)

//update stats for user
router.patch('/:username', updateStats)


module.exports = router