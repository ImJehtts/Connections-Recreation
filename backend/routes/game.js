const express = require('express')
const {
    get_current_game,
    createGame,
    check_answer,
    endGame
} = require('../controllers/gamecontroller')

const router = express.Router()

//get current game (mistakes, so far correct and such)
router.get('/', get_current_game)

//create a new game
router.post('/', createGame)

//check if answer is correct
router.post('/answer', check_answer)

//end game
router.delete('/', endGame)


module.exports = router