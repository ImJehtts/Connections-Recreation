const Wb = require('../models/word_bankmodel')
let OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, 
  })

//Prompts OpenAI api to create word_banks and formats them
async function get_word_bank(){
    const prompt = "Can you create a challenging Connections puzzle for me? I need four groups of words, with each group containing four words that share a common theme. Make sure at least one or two words can be confusing and might seem to fit into more than one category. For example: I just need groups and words. No extra words get rid of filler words in the response like Sure, here’s a challenging Connections puzzle for you: Respond like this: {Famous Inventors: Edison, Tesla, Bell, Wright} {Car Companies: Nissan, Ford, Honda, Toyota} etc... In this example, Tesla could fit into famous inventors and car companies. Another one: {Ships: Titanic, Mayflower, Olympic, Santa Maria} {Tragedies: (9/11, WW2, Black Plague, Chernobyl} etc... In this example, Titanic could fit into Ships and Tragedies but in our answer we put it in the Ships category. MAKE SURE 100% that at least one word in each group could reasonably fit into another group but should only belong to one group in your answer. I need 4 groups total. Don't explain the challenging ones to me. Just give me the 4 groups."

    try{
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model:"gpt-4o",
    })

    if (!response || !response.choices || response.choices.length === 0) {
        throw new Error('API response didnt work') 
    }

    const returned = response.choices[0].message.content.trim()
    console.log(returned)
    //Splits returned into substring array via }, removes whitespace, and then empty strings
    const banks = returned.split('}').map(entry => entry.trim()).filter(entry => entry)

    const wordBanks = banks.map(entry =>{
        //Iterate over array above, creates an array with first element being category and 
        //second being a long string with all the words comma seperated
        const [category, wordsString] = entry.replace('{', '').split(': ')
        //creates new array words that has all the comma seperated words from wordsString 
        const words = wordsString.split(', ').map(word => word.trim())
        return {category, words, solved: false}
    })

    return wordBanks
}catch(error){
    throw error
}
}

//get current wordbank from mongodb
const get_current_wb = async (req, res) =>{
    try{
        const current_wb = await Wb.find({})
        const wordBankMap = current_wb.reduce((map, wordBank) => {
            const category = wordBank.category[0]
            map[category] = wordBank.words
            return map
        }, {})
        res.status(200).json(wordBankMap)   
    }catch (error){
        res.status(404).json({error: error.message})  
       }
}

//create wordbank
const createWb = async (req, res) => {
    try{
     const wordBanks = await get_word_bank()
     for (const wordbank of wordBanks){
        const {category, words, solved} = wordbank
        await Wb.create({category, words, solved})
     }
     res.status(200).json({message: 'Wordbanks created'})   
 }catch (error){
     res.status(404).json({error: error.message})  
    }
}

//delete_wordbank
const delete_wordbank = async (req, res) => {
    try{
        const deleting = await Wb.deleteMany({})
        res.status(200).json({message: 'Wordbanks deleted'})   
    }catch (error){
        res.status(404).json({error: error.message})  
       }
   }


module.exports = {
    get_current_wb,
    createWb,
    delete_wordbank
}
