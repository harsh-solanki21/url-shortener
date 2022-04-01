const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config({ path: './config.env' })
const urlRoutes = require('./routes/urlRoutes')

connectToMongo()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use(urlRoutes)

app.listen(port, () => {
  console.log(`Server is up and running on ${port}`)
})
