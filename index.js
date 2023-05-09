require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL

const routes = require('./routes/routes')
const app = express()
const cors = require('cors')

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

const database = mongoose.connection

const options = {
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': true,
    'optionsSuccessStatus': 200
}

app.use(express.json())
app.use(cors(options))
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



