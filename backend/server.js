require('dotenv').config()


const express = require('express');
const indexRoutes = require('./routes/index')
const mongoose = require('mongoose')

// express app
const app = express();

//middleware 
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('/api', indexRoutes)

//db
mongoose.connect(process.env.MONG_URI)
  .then(() => { 
      app.listen(process.env.PORT, () =>{
        console.log('listening on port')
    })
  })
  .catch((error) => {
    console.log(error)
  })
