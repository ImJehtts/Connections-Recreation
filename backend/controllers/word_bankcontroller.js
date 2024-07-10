const Wb = require('../models/word_bankmodel')
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()

const config = new Configuration({
    apiKey:process.env.OPENAI_KEY,
})

const openai = new OpenAIApi(config);

const get_word_bank = async()=>{
    const prompt = "Can you create a challenging Connections puzzle for me? I need four groups of words, with each group containing four words that share a common theme. Make sure at least one or two words can be confusing and might seem to fit into more than one category. For example: I just need groups and words. No extra words get rid of filler words in the response like Sure, here’s a challenging Connections puzzle for you: Respond like this: {Famous Inventors: Edison, Tesla, Bell, Wright} {Car Companies: Nissan, Ford, Honda, Toyota} etc... In this example, Tesla could fit into famous inventors and car companies. Another one: {Ships: Titanic, Mayflower, Olympic, Santa Maria} {Tragedies: (9/11, WW2, Black Plague, Chernobyl} etc... In this example, Titanic could fit into Ships and Tragedies but in our answer we put it in the Ships category. MAKE SURE 100% that at least one word in each group could reasonably fit into another group but should only belong to one group in your answer. I need 4 groups total."

    const response = await openai.createChatCompletion({
        model:"gpt-4o",
        prompt:prompt,
        max_tokens: 400,
    })

    const returned = response.data.choices[0].text
    const banks = returned.split('}').map(entry => entry.trim()).filter(entry => entry)

    const wordBanks = banks.map(entry =>{
        const [category, wordsString] = entry.replace('{', '').split(': ')
        const words = wordsString.split(', ').map(word => word.trim())
        return {category, words, solved: false}
    })

    return wordBanks
}

//get current wordbank from mongodb
const get_current_wb = async (req, res) =>{
    try{
        const deleting = await Wb.find({})
        res.status(200).json(deleting)   
    }catch (error){
        res.status(404).json({error: error.message})  
       }
}

//create wordbank
const createWb = async (req, res) => {
    try{
     const wordBanks = await get_word_bank();
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
