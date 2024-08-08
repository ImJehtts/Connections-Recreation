require('dotenv').config()
const cors = require('cors')

const express = require('express')
const indexRoutes = require('./routes/index')
const mongoose = require('mongoose')

// express app
const app = express()

//middleware 
app.use(express.json())
app.use(cors({origin: process.env.FRONT_END_PORT}))
app.use((req, res, next) => {
    next()
  })

// routes
app.use('/api', indexRoutes)

//db
mongoose.connect(process.env.MONG_URI)
  .then(() => { 
      app.listen(process.env.PORT, () =>{
    })
  })
  .catch((error) => {
    console.log(error)
  })
