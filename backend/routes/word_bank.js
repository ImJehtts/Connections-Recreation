const express = require('express')
const Stats = require('../models/word_bankmodel')

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({mssg: 'get current word bank'})
})

router.post('/', (req, res)=>{
    res.json({mssg: 'generate word bank/post'})
})

router.delete('/', (req, res)=>{
    res.json({mssg: 'delete word bank/post'})
})

module.exports = router