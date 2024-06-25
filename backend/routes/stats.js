const express = require('express')

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({mssg: 'update stats'})
})

module.exports = router