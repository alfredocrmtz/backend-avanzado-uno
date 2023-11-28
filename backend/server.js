const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tareas', require('./routes/tareasRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server start in port ${port}`))
