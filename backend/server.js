require('dotenv').config()


const express = require('express');
const indexRoutes = require('./routes/index')

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


app.listen(process.env.PORT, () =>{
    console.log('listening on port')
})