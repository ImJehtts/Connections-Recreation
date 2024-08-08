const Wb = require('../models/word_bankmodel')
let OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, 
  })

//Prompts OpenAI api to create word_banks and formats them
async function get_word_bank(){
    const prompt = "Here’s a refined prompt to encourage OpenAI to provide harder categories for your Connections puzzles: Create a challenging Connections puzzle for me. I need four groups of words, with each group containing four words that share a common theme. Make sure the categories are complex and not overly simplistic. Each group should include at least one or two words that might seem to fit into more than one category, but each word should belong to only one group. For example: {Famous Inventors: Edison, Tesla, Bell, Wright} {Car Companies: Nissan, Ford, Honda, Toyota} In this example, Tesla could fit into both Famous Inventors and Car Companies. Another example: {Ships: Titanic, Mayflower, Olympic, Santa Maria} {Tragedies: 9/11, WW2, Black Plague, Chernobyl} In this example, Titanic could fit into Ships and Tragedies but should only be categorized as Ships. Avoid easy categories like colors or planets and focus on different themes/groups of words (having 1 easy category is ok, but make the rest not as easy). Provide only the groups and words. Do not include any explanations or additional text or numbering of categories. Return them in order from easiest to hardest"

    try{
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model:"gpt-4o-mini",
    })

    if (!response || !response.choices || response.choices.length === 0) {
        throw new Error('API response didnt work') 
    }

    const returned = response.choices[0].message.content.trim()
    //Splits returned into substring array via }, removes whitespace, and then empty strings
    const banks = returned.split('}').map(entry => entry.trim()).filter(entry => entry)

    const wordBanks = banks.map(entry =>{
        //Iterate over array above, creates an map with first element being category and 
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
        // Reduce the word bank data into a map where each category is a key
        const wordBankMap = current_wb.reduce((map, wordBank) => {
            // Get the category of the current word bank entry
            const category = wordBank.category
            // Add the current word bank entry to the map with the category as the key
            map[category] = {
                words: wordBank.words,
                solved: wordBank.solved
            }
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
        //get wordbank from openai
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
