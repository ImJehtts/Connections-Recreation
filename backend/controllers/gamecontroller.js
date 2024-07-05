const Game = require('../models/gamemodel')

//get current game (mistakes, so far correct and such)
const get_current_game = async (req, res) =>{
    const current_game = await Game.find({})

    res.status(200).json(current_game)
}

//create a new game
const createGame = async (req, res) => {
    const{mistakes, correct, correct_words} = req.body

    try{
     const game = await Game.create({mistakes, correct, correct_words})
     res.status(200).json(game)  
 }catch (error){
     res.status(404).json({error: error.message})  
    }
}


//check if answer is correct
//Will do later



//end/delete game
const endGame = async (req, res) => {
    try{
        const game = await Game.deleteOne({})
        if (result.deletedCount === 0){
            return res.status(404).json({error: 'No game to delete/end'})
        }
        res.status(200).json({message: 'Game ended'})  
    }catch (error){
        res.status(404).json({error: error.message})  
       }
}


module.exports = {
    get_current_game,
    createGame,
    endGame
}
