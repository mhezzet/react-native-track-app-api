const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')

const app = express()
const port = process.env.PORT || 4001

app.use(express.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoURI =
  'mongodb+srv://mhezzet:j93pgcNym6PfZE67@cluster0-wmnmm.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('connected to mongodb server'))
  .catch(err => console.error('error connecting to mongodb', err))

app.listen(port, () => {
  console.log('listening on port' + port)
})
