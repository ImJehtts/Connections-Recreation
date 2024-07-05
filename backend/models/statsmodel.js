const mongoose = require('mongoose')

const Schema = mongoose.Schema

const statsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    solved: {
        type: Number,
        required: true
    },
    failed: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    current_streak: {
        type: Number,
        required: true
    },
    longest_streak: {
        type: Number,
        required: true
    },
}, {timestamps:true})

module.exports = mongoose.model('Stats', statsSchema)