const express = require('express')
const {
    get_current_game,
    createGame,
    endGame
} = require('../controllers/gamecontroller')

const router = express.Router()

//get current game (mistakes, so far correct and such)
router.get('/', get_current_game)

//create a new game
router.post('/', createGame)

//check if answer is correct
router.get('/answer', (req, res)=>{
    res.json({mssg: 'check if answer is correct'})
})

//end game
router.delete('/end', endGame)


module.exports = router