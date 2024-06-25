const express = require('express')

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({mssg: 'generate word bank'})
})

module.exports = router