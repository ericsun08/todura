require('dotenv').config()
const express = require('express')

const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes')
const priorityRoutes = require('./routes/priority.routes')

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/users', userRoutes)
app.use('/api/priorities', priorityRoutes)

//connect to MONGO DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })