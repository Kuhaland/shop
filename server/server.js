require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/auth')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(3000, () => {
  console.log('SERVER START')
})
