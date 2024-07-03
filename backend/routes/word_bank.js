const express = require('express')

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