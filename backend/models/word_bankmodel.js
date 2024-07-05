const mongoose = require('mongoose')

const Schema = mongoose.Schema

//We create 4 of these, one for each row
const wbSchema = new Schema({
    words: {
        type: [String],
        required: true
    },
    solved: {
        type: Boolean,
        required: true
    },
}, {timestamps:true})

module.exports = mongoose.model('Wordbank', wbSchema)