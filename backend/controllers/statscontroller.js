const Stats = require('../models/statsmodel')


//get current stats
const getStats = async (req, res) =>{
    const stats = await Stats.find({})

    res.status(200).json(stats)
}


//get current stats based on username 
const getStats_byusername = async (req, res) => {
    const{username} = req.params

    if(!username){
        return res.status(404).json({error: 'username not found'})
    }
try{
    const stats = await Stats.findOne({ username })
    res.status(200).json(stats)
}catch (error){
    return res.status(404).json({error: 'No stats with that username'})
   }
}

//create stats/new user
const createUser = async (req, res) => {
    const{username, solved, failed, percentage, current_streak, longest_streak} = req.body

    try{
     const stats = await Stats.create({username, solved, failed, percentage, current_streak, longest_streak})
     res.status(200).json(stats)  
 }catch (error){
     res.status(404).json({error: error.message})  
    }
}

//update current stats
const updateStats = async (req, res) => {
    const{username} = req.params

    if(!username){
        return res.status(404).json({error: 'username not found'})
    }

    const stats = await Stats.findOneAndUpdate(
        {username}, 
        {...req.body})
        
    if (!stats) {
        return res.status(404).json({ error: 'No stats with that username' });
    }
    res.status(200).json(stats)

}


module.exports = {
    getStats,
    getStats_byusername,
    createUser,
    updateStats
}

