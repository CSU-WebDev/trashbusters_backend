
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
// const router = express.Router()
// module.exports = router
// const mongoose = require('mongoose')
// const mongoString = process.env.DATABASE_URL

// mongoose.connect(mongoString)
// const database = mongoose.connection

const routes = require('./routes/routes')
const app = express()
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });
const cors=require('cors');
const options = {
    "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}

app.use(express.json())
app.use(cors(options))
app.use('/api', routes)

  
// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database connected')
// })

app.listen(3000, () => {
    console.log('Server started on port 3000')
})



