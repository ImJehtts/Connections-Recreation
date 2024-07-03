const express = require('express')

const router = express.Router()


router.post('/', (req, res)=>{
    res.json({mssg: 'create a new game/post'})
})

router.get('/:id', (req, res)=>{
    res.json({mssg: 'get current game/stats (mistakes, so far correct and such)'})
})

router.post('/:id/answer', (req, res)=>{
    res.json({mssg: 'check if answer is correct'})
})

router.post('/:id/end', (req, res)=>{
    res.json({mssg: 'end game'})
})


module.exports = router