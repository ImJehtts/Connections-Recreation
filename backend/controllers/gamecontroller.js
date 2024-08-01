const Game = require('../models/gamemodel')
const Wb = require('../models/word_bankmodel')

//get current game (mistakes, so far correct and such)
const get_current_game = async (req, res) =>{
    try{
        const current_game = await Game.find({})
        res.status(200).json(current_game)
    }catch (error){
        res.status(404).json({error: error.message})  
       }
}

//create a new game
const createGame = async (req, res) => {
    const mistakes = 4
    const correct = 0

    try{
     const game = await Game.create({mistakes, correct})
     res.status(200).json(game)  
 }catch (error){
     res.status(404).json({error: error.message})  
    }
}


const check_answer = async (req, res) => {
    const {answerString} = req.body

    try{
        const wordBanks = await Wb.find({})
        const game = await Game.findOne({})
        //wordBanks.find goes through all the elements for the first one that the function returns true
        const matchingWordBank = wordBanks.find(wordBank => {
            for (let i = 0; i < answerString.length; i++) {
                const word = answerString[i]
                if (!wordBank.words.includes(word)) {
                    return false 
                }
            }
            return true 
        })

        if(matchingWordBank){
            await Wb.updateOne(
                {_id: matchingWordBank._id}, 
                {$set: {solved: true}})
            await Game.updateOne(
                {_id: game._id}, 
                {$inc: {correct: 1}})
            res.status(200).json({message: "answer correct", category: matchingWordBank.category})  
        }else{
            await Game.updateOne(
                {_id: game._id}, 
                {$inc: {mistakes: -1}})
            res.status(200).json({message: "answer incorrect"})  
        }

        
    }catch (error){
        res.status(404).json({error: error.message})  
    }
}



//end/delete game
const endGame = async (req, res) => {
    try{
        const deleting = await Game.deleteOne({})
        res.status(200).json({message: 'games deleted'})   
    }catch (error){
        res.status(404).json({error: error.message})  
       }
}


module.exports = {
    get_current_game,
    createGame,
    check_answer,
    endGame
}
