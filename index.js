
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
// const router = express.Router()
// module.exports = router
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

const routes = require('./routes/routes')
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use('/api', routes)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database connected')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})



