const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema({
    mistakes: {
        type: Number,
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
    correct_words: {
        type: [String],
        required: true
    },
}, {timestamps:true})

module.exports = mongoose.model('Game', gameSchema)