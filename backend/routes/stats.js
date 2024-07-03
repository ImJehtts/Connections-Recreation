const express = require('express')

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({mssg: 'get current stats'})
})

router.post('/', (req, res)=>{
    res.json({mssg: 'update stats/post'})
})


module.exports = router